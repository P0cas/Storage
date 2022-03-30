const express = require('express');
const crypto = require('crypto');
const jwt = require('../modules/jwt');
const db = require('../config/conn-sqlite3');
const { send, email_checker } = require('../modules/mail');
const router = express();

const isLocal = () => (req, res, next) => (req.connection.remoteAddress === '::ffff:127.0.0.1'|| req.connection.remoteAddress === '::1' ? true:false) 
    ? next() 
    : res.json({'state':'You\'re not locally'}); 

const generator_code = (n) => {
    let code = ''
    for (let i = 0; i < n; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}

router.post('/login', isLocal(), (req, res) => {
    const { username, password } = req.body;
    const enc_password = crypto.createHash('sha512').update(password).digest('hex');
    const query = 'SELECT * from users where username = ? and password = ?';

    db.get(query, [username, enc_password], async (err, row) => {
        if (err) { res.status(500);res.send('Internal Server Error'); }
        else {
            if (row == undefined) { res.status(401);res.send('<script>alert(\'Authentication failed\');history.back(-1);</script>'); }
            else {
                const { token } = await jwt.sign(row); res.cookie('token', token);
                res.send(token);
            }
        }
    });
});

router.post('/register', isLocal(), (req, res) => {
    const { firstname, lastname, username, password1, password2, email} = req.body;
    const enc_password = crypto.createHash('sha512').update(password1).digest('hex');
    const select_query = 'SELECT * from users where username = ?';
    const insert_query = 'insert into users(name, username, password, email, isAdmin) values (?, ?, ?, ?, false)';
    const pw_check = (password1 == password2)? false : true;
    const fullname = firstname + lastname;

    if (firstname == '' || lastname == '' || username == '' || password1 == '' || password2 == '' || email == '') {
        res.json({'state':'Do not have an empty value. Please enter again.'});
    } else {
        db.get(select_query, username, (err, row) => {
            let username_check = false;
            if (err) { res.status(500);res.send('Internal Server Error'); }
            else {
                username_check = (row !== undefined)? true : false;
                if (username_check || pw_check) {
                    result = (username_check == true)? 'There is already a user with the same ID already exists.' : '';
                    CHARCODE = '';
                    if (result.length > 0) {
                        CHARCODE = ' or ';
                    }
                    result += (pw_check == true)? `${CHARCODE}The password you entered does not match` : '';
                    res.json({'state':result});
                }
                else {
                    db.run(insert_query, [fullname, username, enc_password, email], function (err) {
                        if (err) {
                            res.status(500);res.json({'state':'Internal Server Error'});
                        } else{
                            res.json({'state':'Register succeeded. Please log in.'});
                        }
                    });
                }
            }
        });
    }
});

router.post('/forgot-password', isLocal(), (req, res) => {
    const { email } = req.body;
    if (email == '') {
        res.json({'state':'Do not have an empty value. Please enter again.'});
    } else {
        const to = email_checker(email);
        const OptCode = generator_code(8);
    
        const select_query = 'SELECT * from users where email = ?';
        const update_query = 'UPDATE users set code = ? where username = ?';
    
        target = typeof(to) == 'object'? to[0] : to;
        db.get(select_query, target, async (err, row) => {
            if (err) { res.status(500);res.send('Internal Server Error'); }
            else {
                if (row == undefined) { res.status(401);res.send('<script>alert(\'The matching user does not exist.\');history.back(-1);</script>'); }
                else {
                    db.run(update_query, [OptCode, row['username']], function (err) {
                        if (err) {
                            res.status(500);res.json({'state':'Internal Server Error'});
                        } else {
                            send(to, OptCode);
                            res.json({'state':'The recovery code has been sent to the mail. Please check your mail.'});
                        }
                    });
                }
            }
        });
    }
});

router.post('/change-password', isLocal(), (req, res) => {
    const { username, OptCode, newPassword1, newPassword2 } = req.body;
    const enc_password = crypto.createHash('sha512').update(newPassword1).digest('hex');
    const pw_check = (newPassword1 == newPassword2)? false : true;

    if (username == '' || newPassword1 == '' || newPassword2 == '' || OptCode == '') {
        res.send('<script>alert(\'Do not have an empty value. Please enter again.\');history.back(-1);</script>');
    } else {
        const select_query = 'SELECT * from users where username = ?';
        const update_query = 'UPDATE users set cycle = ?, code = ?, password = ? where username = ?';
        const cancle_query = 'UPDATE users set cycle = ? where username = ?';
        const opt_query = 'UPDATE users set cycle = ?, code = ? where username = ?';

        db.get(select_query, username, async (err, row) => {
            if (err) { res.status(500);res.send('Internal Server Error'); }
            else {
                if (row == undefined) { res.status(401);res.send('<script>alert(\'The matching user does not exist.\');history.back(-1);</script>'); }
                else {
                    if (row['code'] == '') {
                        res.json({'state':'Please reset OPTCODE.'});
                    } else {
                        if (row['code'] === OptCode) {
                            if (pw_check) {
                                result = 'The password you entered does not match';
                                res.json({'state':result});
                            } else {
                                db.run(update_query, [0, '', enc_password, row['username']], function (err) {
                                    if (err) {
                                        res.status(500);res.json({'state':'Internal Server Error'});
                                    } else{
                                        res.json({'state':'Password change succeeded. Please log in.'});
                                    }
                                });
                            }
                        } else {
                            cycle = row['cycle'] + 1;
                            if (cycle == 5 ) {
                                db.run(opt_query, [0, '', row['username']], function (err) {
                                    if (err) {
                                        res.status(500);res.json({'state':'Internal Server Error'});
                                    } else{
                                        res.json({'state':`Failure (${cycle}/5).`});
                                    }
                                });
                            } else {
                                db.run(cancle_query, [cycle, row['username']], function (err) {
                                    if (err) {
                                        res.status(500);res.status(500); res.json({'state':'Internal Server Error'});
                                    } else{
                                        res.json({'state':`Failure (${cycle}/5).`});
                                    }
                                });
                            }
                        }
                    }
                }
            }
        });
    }
});

router.get('/logout', isLocal(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;