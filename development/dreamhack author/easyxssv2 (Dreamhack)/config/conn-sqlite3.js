const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/database/chall.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('[+] Connected to the mydb database.');
    }
});

module.exports = db;