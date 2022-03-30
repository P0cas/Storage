const db = require('./conn-sqlite3');
const users = require('./users').users;

console.log(`[+] Generated Admin Account`);
console.log(`[-] username : ${process.env.admin_id}`);
console.log(`[-] password : ${process.env.admin_pw}`);
console.log(`[-] email    : ${process.env.gmail}`);

const DropTheTable = `
    DROP TABLE IF EXISTS users
`;

const CreateTheTable = `
    CREATE TABLE IF NOT EXISTS users(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(25),
        username VARCHAR(25),
        password VARCHAR(128),
        email VARCHAR(50),
        isAdmin BOOLEAN,
        code VARCHAR(8),
        cycle INTEGER
    )
`;


const InsertTheAdminAccount = `
    insert into users(name, username, password, email, isAdmin, code, cycle) values ('${users.admin.name}', '${users.admin.username}', '${users.admin.password}', '${users.admin.email}', true, '${users.admin.code}', 0)
`;

db.serialize(() => {
    db.each(DropTheTable);
    db.each(CreateTheTable);
    db.each(InsertTheAdminAccount);

    // Create a dummy user
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
    db.each(`insert into users(name, username, password, email, isAdmin, code, cycle) values ('${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(4) + Math.random().toString(36).slice(2)}', '${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(10)}@gmail.com', false, '', 0)`);
});