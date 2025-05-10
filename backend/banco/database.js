const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_NAME, (err) => {
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
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de tutores: ${err.message}`);
        }
        console.log('Tabela de tutores criada ou já existe.');
    });
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS pets (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name VARCHAR(150) NOT NULL,
           species VARCHAR(150) NOT NULL,
           age INTEGER NOT NULL,
           tutorId INTEGER NOT NULL REFERENCES tutors(id)
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de pets: ${err.message}`);
        }
        console.log('Tabela de pets criada ou já existe.');
    });
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS products (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name VARCHAR(150) NOT NULL,
           price INTEGER NOT NULL,
           category VARCHAR(150) NOT NULL,
           stock INTEGER NOT NULL
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de produtos: ${err.message}`);
        }
        console.log('Tabela de produtos criada ou já existe.');
    });
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS services (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name VARCHAR(150) NOT NULL,
           price INTEGER NOT NULL,
           duration VARCHAR(10),
           description VARCHAR(500) 
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de serviços: ${err.message}`);
        }
        console.log('Tabela de serviços criada ou já existe.');
    });
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS order_products (
            orderId INTEGER NOT NULL REFERENCES orders(id),
            productId INTEGER NOT NULL REFERENCES products(id),
            quantidade INTEGER NOT NULL,
            PRIMARY KEY (orderId, productId)
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de pedido_produtos: ${err.message}`);
        }
        console.log('Tabela de pedido_produtos criada ou já existe.');
    });
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS order_services (
            orderId INTEGER NOT NULL REFERENCES orders(id),
            serviceId INTEGER NOT NULL REFERENCES services(id),
            quantidade INTEGER NOT NULL,
            PRIMARY KEY (orderId, serviceId)
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de pedido_serviços: ${err.message}`);
        }
        console.log('Tabela de pedido_serviços criada ou já existe.');
    });
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tutorId INTEGER NOT NULL REFERENCES tutors(id),
            petId INTEGER NOT NULL REFERENCES pets(id),
            products TEXT,
            services TEXT,
            total REAL NOT NULL,
            status VARCHAR(50) NOT NULL
       )`, (err) => {
        if (err) {
            throw new Error(`Erro ao criar tabela de pedidos: ${err.message}`);
        }
        console.log('Tabela de pedidos criada ou já existe.');
    });
});

module.exports = db;