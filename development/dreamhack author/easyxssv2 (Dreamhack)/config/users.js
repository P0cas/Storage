const crypto = require('crypto');

module.exports = {
    users : {
        'admin':{
            'name': 'SuperUser',
            'username': process.env.admin_id,
            'password': crypto.createHash('sha512').update(process.env.admin_pw).digest('hex'),
            'email': process.env.gmail,
            'isAdmin': true,
            'code':''
        }
    }
}