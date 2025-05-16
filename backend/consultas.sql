-- DROP TABLE IF EXISTS order_product;
-- DROP TABLE IF EXISTS order_service;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS services;
-- DROP TABLE IF EXISTS pets;
-- DROP TABLE IF EXISTS tutors;
-- DROP TABLE IF EXISTS users;

-- INSERT INTO tutors (name, email, phone) values ('tutor 1', 'ex1@email.com', '123456789');
-- INSERT INTO tutors (name, email, phone) values ('tutor 2', 'ex2@email.com', '212356798');

-- INSERT INTO pets (name, species, age, tutorId) values ('pet 1', 'cachorro', 2, 1);
-- INSERT INTO pets (name, species, age, tutorId) values ('pet 2', 'gato', 1, 2);

-- INSERT INTO products (name, price, category, stock) values ('produto 1', 10, 'brinquedo', 5);
-- INSERT INTO products (name, price, category, stock) values ('produto 2', 20, 'ração', 10);

-- INSERT INTO services (name, price, duration, description) values ('banho', 50, 'tosa', 'banho e tosa');
-- INSERT INTO services (name, price, duration, description) values ('vacina', 100, 'vacinação', 'vacina contra raiva');

-- INSERT INTO order_product (orderId, productId, prodQtd, prodPrice) values (1, 1, 1, 10);
-- INSERT INTO order_product (orderId, productId, prodQtd, prodPrice) values (1, 2, 2, 20);
-- INSERT INTO order_service (orderId, serviceId, servQtd, servPrice) values (1, 1, 2, 100);

-- INSERT INTO order_product (orderId, productId, prodQtd, prodPrice) values (2, 2, 2, 20);
-- INSERT INTO order_service (orderId, serviceId, servQtd, servPrice) values (2, 1, 2, 50);
-- INSERT INTO order_service (orderId, serviceId, servQtd, servPrice) values (2, 2, 1, 100);

-- INSERT INTO orders (tutorId, petId, products, services, total, status) values (1, 1, '[2,1,2]', '[1,1]', 100, 'pendente');
-- INSERT INTO orders (tutorId, petId, products, services, total, status) values (2, 2, '[2,2]', '[2,1,1]', 240, 'pendente');

-- INSERT INTO users (username, password) values ('admin', 'admin');