const express = require('express');
const jwt = require('../modules/jwt');
const db = require('../config/conn-sqlite3');
const router = express();

const isLogin = () => async (req, res, next) => {
    if (req.cookies['token'] !== undefined){
        const decoded = await jwt.verify(req.cookies['token']);
        if (decoded !== -2){
            next();
        } else {
            res.status(401);res.json({'state':'401', 'error':'Authentication failed'});
        }
    } else {
        res.json({'state':'You\'re not login.'});
    }
} 

const isAdmin = () => async (req, res, next) => {
    const decoded = await jwt.verify(req.cookies['token']);
    if (decoded['isAdmin'] === 1) {
        next();
    } else {
        res.status(401);res.json({'state':'401', 'error':'You\'re not admin'});
    }
}

router.get('/myinfo', isLogin(), (req, res) => {
    const query = "SELECT user_id, username, email from users"
    db.all(query, (err, row) => {
        if (err) { console.log(err.message);res.status(500);res.send('Internal Server Error'); }
        else {
            // Parsing only the logged-in user's information
            // Developing ...
            res.json(row);
        }
    });
});

router.get('/flag', isLogin(), isAdmin(), (req, res) => {
    res.send({'flag':process.env.FLAG})
});

module.exports = router;