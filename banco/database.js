const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
        console.log('Erro ao conectar com o Banco de Dados');
        return;
    }
    console.log('Conectado com o Banco de Dados');
});

db.serialize(() => {
    db.run(
       `CREATE TABLE IF NOT EXISTS tutors (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name VARCHAR(150) NOT NULL,
           email VARCHAR(150) NOT NULL UNIQUE,
           phone VARCHAR(150) NOT NULL
       )`);
});

db.serialize(() => {
    db.run(
       `CREATE TABLE IF NOT EXISTS pets (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name VARCHAR(150) NOT NULL,
           species VARCHAR(150) NOT NULL,
           age INTEGER NOT NULL,
           tutorId INTEGER NOT NULL REFERENCES tutors(id)
       )`);
});

module.exports = db;