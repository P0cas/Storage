const mysql = require('mysql');
const info = {
       host : 'localhost',
       user : 'root',
       password : 'pocas',
       database : 'challenge'
};

module.exports = {
        init: function() {
               return mysql.createConnection(info);
        },
        connect: function(conn){
               conn.connect(function(err){
                        if(err) console.error('mysql connection error : ' + err);
                        else console.log('mysql is connected Successfully!');
                });
        }
}