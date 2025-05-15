const db = require('../banco/database');
const tabela = 'orders';
const order_product = 'order_product';
const order_service = 'order_service';

function pegarPedidos(res, next) {
    db.all(`
        SELECT 
            orders.id AS id,
            orders.tutorId AS tutorId,
            orders.petId AS petId,
            orders.products AS productIds,
            prod.prodQtds,
            prod.prodPrices,
            prod.prodTotals,
            orders.services AS serviceIds,
            serv.servQtds,
            serv.servPrices,
            serv.servTotals,
            orders.total AS total,
            orders.status AS status
        FROM ${tabela}
        LEFT JOIN tutors ON tutors.id = orders.tutorId
        LEFT JOIN pets ON pets.id = orders.petId
        LEFT JOIN (
            SELECT ${order_product}.orderId, 
                GROUP_CONCAT(prodQtd) AS prodQtds,
                GROUP_CONCAT(prodPrice) AS prodPrices,
                GROUP_CONCAT(prodTotal) AS prodTotals
            FROM ${order_product}
            GROUP BY ${order_product}.orderId
        ) AS prod ON prod.orderId = orders.id
        LEFT JOIN (
            SELECT ${order_service}.orderId, 
                GROUP_CONCAT(servQtd) AS servQtds,
                GROUP_CONCAT(servPrice) AS servPrices,
                GROUP_CONCAT(servTotal) AS servTotals
            FROM ${order_service}
            GROUP BY ${order_service}.orderId
        ) AS serv ON serv.orderId = orders.id
        GROUP BY orders.id, tutors.id, pets.id, orders.total, orders.status;
    `, [], (err, data) => {

        if (err) {
            console.error(err);
            return next(err);
        }
        if (data.length === 0) {
            console.error(err);
            return res.json('Não encontrado');
        }
        return res.json(data);
    });
}

function pegarPedidoPorId(req, res, next) {
    const id = Number(req.params.id);
    db.all(`
        SELECT 
            orders.id AS id,
            orders.tutorId AS tutorId,
            orders.petId AS petId,
            orders.products AS productIds,
            prod.prodQtds,
            prod.prodPrices,
            prod.prodTotals,
            orders.services AS serviceIds,
            serv.servQtds,
            serv.servPrices,
            serv.servTotals,
            orders.total AS total,
            orders.status AS status
        FROM ${tabela}
        LEFT JOIN tutors ON tutors.id = orders.tutorId
        LEFT JOIN pets ON pets.id = orders.petId
        LEFT JOIN (
            SELECT ${order_product}.orderId, 
                GROUP_CONCAT(prodQtd) AS prodQtds,
                GROUP_CONCAT(prodPrice) AS prodPrices,
                GROUP_CONCAT(prodTotal) AS prodTotals
            FROM ${order_product}
            GROUP BY ${order_product}.orderId
        ) AS prod ON prod.orderId = orders.id
        LEFT JOIN (
            SELECT ${order_service}.orderId, 
                GROUP_CONCAT(servQtd) AS servQtds,
                GROUP_CONCAT(servPrice) AS servPrices,
                GROUP_CONCAT(servTotal) AS servTotals
            FROM ${order_service}
            GROUP BY ${order_service}.orderId
        ) AS serv ON serv.orderId = orders.id
         WHERE orders.id = ?;
        GROUP BY orders.id, tutors.id, pets.id, orders.total, orders.status;
    `, [id], [], (err, data) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (data.length === 0) {
            console.error(err);
            return res.json('Não encontrado');
        }
        return res.json(data);
    });
}

function criarPedido(req, res) {
    const corpo = req.body;

    if (!corpo.tutorId) {
        return res.status(400).json({ error: "TutorId é obrigatório!" });
    }

    let prod = corpo.products ? JSON.parse(corpo.products) : [];
    let serv = corpo.services ? JSON.parse(corpo.services) : [];

    prod = JSON.stringify([...new Set(prod)].sort((a, b) => a - b));
    serv = JSON.stringify([...new Set(serv)].sort((a, b) => a - b));

    db.run(`INSERT INTO orders 
                    (tutorId, petId, products, services, total, status)
                    values
                    (?, ?, ?, ?, ?, ?)`,
        [corpo.tutorId, corpo.petId || null, prod || null, serv || null, 0, "Pendente"],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao criar pedido' });
            }

            let orderId = this.lastID;

            let products = corpo.products ? JSON.parse(corpo.products) : []; // converte os produtos para JSON e caso não tenha nada, retorna um array vazio []
            let services = corpo.services ? JSON.parse(corpo.services) : [];

            // Calcula a quantidade de cada produto
            let qtdProduto = products.reduce((contagem, productId) => { // contagem é quem vai guardar a quantidade de cada produto, contagem é um objeto vazio inicialmente {}
                contagem[productId] = (contagem[productId] || 0) + 1; // se contagem[productId] tiver algo, soma 1 - se não tiver, insere o 0 e soma 1
                return contagem;
            }, {});

            Object.entries(qtdProduto).forEach(([productId, quantidade]) => {
                db.get(`SELECT price FROM products WHERE id = ?`, [productId], (err, row) => {
                    if (err || !row) return console.error(err);
                    let price = row.price;

                    db.run(`INSERT INTO ${order_product} (orderId, productId, prodQtd, prodPrice)
                        VALUES (?, ?, ?, ?)`, [orderId, productId, quantidade, price], (err) => {
                        if (err) return console.error(err);
                    });
                });
            });

            // Calcula a quantidade de cada serviço
            let qtdService = services.reduce((contagem, serviceId) => {
                contagem[serviceId] = (contagem[serviceId] || 0) + 1;
                return contagem;
            }, {});

            Object.entries(qtdService).forEach(([serviceId, quantidade]) => {
                db.get(`SELECT price FROM services WHERE id = ?`, [serviceId], (err, row) => {
                    if (err || !row) return console.error(err);
                    let price = row.price;

                    db.run(`INSERT INTO ${order_service} (orderId, serviceId, servQtd, servPrice)
                        VALUES (?, ?, ?, ?)`, [orderId, serviceId, quantidade, price], (err) => {
                        if (err) return console.error(err);
                    });
                });
            });

            // atualizar tabela pedido com base nas outras tabelas
            setTimeout(() => {

                db.run(`UPDATE ${tabela} SET total =(
                    (SELECT COALESCE(SUM(prodTotal), 0) FROM ${order_product} WHERE orderId = ?) +
                    (SELECT COALESCE(SUM(servTotal), 0) FROM ${order_service} WHERE orderId = ?))
                    WHERE id = ?`, [orderId, orderId, orderId], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao atualizar o total do pedido' });
                    }

                    return res.json({ message: "Pedido criado com sucesso!" });
                });
            }, 1000);
        });
}

function atualizarPedido(req, res) {
    const id = Number(req.params.id);
    const corpo = req.body;

    // verificações para não alterar nada
    let count = 0;
    for (let key in corpo) count++;
    if (count === 0) return res.json('Sem alterações');

    db.serialize(() => {
        db.run(`CREATE TEMP TABLE IF NOT EXISTS products_backup AS SELECT * FROM ${order_product} WHERE orderId = ?`, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao criar tabela de backup de produtos' });
            }
        });
        db.run(`CREATE TEMP TABLE IF NOT EXISTS services_backup AS SELECT * FROM ${order_service} WHERE orderId = ?`, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao criar tabela de backup de serviços' });
            }
        });

        db.get(`SELECT * FROM ${tabela} WHERE id = ?`, [id], (err, row) => {
            if (err || !row) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao buscar o pedido' });
            }

            // cria um corpo temporário com os dados do corpo ou do pedido no banco
            let novoCorpo = {
                tutorId: corpo.tutorId || row.tutorId,
                petId: corpo.petId || row.petId,
                products: corpo.products || row.products,
                services: corpo.services || row.services,
                status: corpo.status || row.status,
            };

            let prod = novoCorpo.products ? JSON.parse(novoCorpo.products) : [];
            let serv = novoCorpo.services ? JSON.parse(novoCorpo.services) : [];
            prod = JSON.stringify([...new Set(prod)].sort((a, b) => a - b));
            serv = JSON.stringify([...new Set(serv)].sort((a, b) => a - b));

            db.run(`UPDATE ${tabela} SET tutorId = ?, petId = ?, products = ?, services = ?, status = ? WHERE id = ?`,
                [novoCorpo.tutorId, novoCorpo.petId, prod, serv, novoCorpo.status, id], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao atualizar o pedido' });
                    }
                    return res.json({ message: 'Pedido atualizado com sucesso!' });
                }
            );
        });
    });

    // se corpo.products conter algo, apaga os antigos registros
    if (corpo.products) {
        db.serialize(() => {
            db.run(`DELETE FROM ${order_product} WHERE orderId = ?`, [id], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao deletar produtos antigos' });
                }
            });
            let products = corpo.products ? JSON.parse(corpo.products) : [];

            let qtdProduto = products.reduce((contagem, productId) => {
                contagem[productId] = (contagem[productId] || 0) + 1;
                return contagem;
            }, {});

            Object.entries(qtdProduto).forEach(([productId, quantidade]) => {
                db.get(`SELECT price FROM products WHERE id = ?`, [productId], (err, row) => {
                    if (err || !row) return console.error(err);
                    let price = row.price;

                    db.run(`INSERT INTO ${order_product} (orderId, productId, prodQtd, prodPrice)
                    VALUES (?, ?, ?, ?)`, [id, productId, quantidade, price], (err) => {
                        if (err) return console.error(err);
                    });
                });
            });
        });
    }

    // se corpo.services conter algo, apaga os antigos registros
    if (corpo.services) {
        db.serialize(() => {
            db.run(`DELETE FROM ${order_service} WHERE orderId = ?`, [id], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao deletar serviços antigos' });
                }
            });

            let services = corpo.services ? JSON.parse(corpo.services) : [];

            // Calcula a quantidade de cada serviço
            let qtdService = services.reduce((contagem, serviceId) => {
                contagem[serviceId] = (contagem[serviceId] || 0) + 1;
                return contagem;
            }, {});

            Object.entries(qtdService).forEach(([serviceId, quantidade]) => {
                db.get(`SELECT price FROM services WHERE id = ?`, [serviceId], (err, row) => {
                    if (err || !row) return console.error(err);
                    let price = row.price;

                    db.run(`INSERT INTO ${order_service} (orderId, serviceId, servQtd, servPrice)
                        VALUES (?, ?, ?, ?)`, [id, serviceId, quantidade, price], (err) => {
                        if (err) return console.error(err);
                    });
                    setTimeout(() => {
                        db.run(`UPDATE ${tabela} SET total =(
                    (SELECT COALESCE(SUM(prodTotal), 0) FROM ${order_product} WHERE orderId = ?) +
                    (SELECT COALESCE(SUM(servTotal), 0) FROM ${order_service} WHERE orderId = ?))
                    WHERE id = ?`, [id, id, id], (err) => {
                            console.log('chegou aqui');
                        });
                    }, 500);
                });
            });
        });
    }
}

function apagarPedido(req, res) {
    const id = Number(req.params.id);

    db.serialize(() => {
        db.get(`SELECT * FROM ${tabela} WHERE id=?`, [id], (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao buscar o pedido' });
            }
            if (!row) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            // caso encontre o pedido
            db.run(`DELETE FROM ${order_product} WHERE orderId=?`, [id], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao remover produtos antigos' });
                }
                db.run(`DELETE FROM ${order_service} WHERE orderId=?`, [id], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao remover serviços antigos' });
                    }
                    db.run(`DELETE FROM ${tabela} WHERE id=?`, [id], function (err) {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Erro ao remover o pedido' });
                        }
                        return res.json({ mensagem: 'Pedido removido com sucesso!' });
                    });
                });
            });
        });
    });
}

module.exports = {
    pegarPedidos,
    pegarPedidoPorId,
    criarPedido,
    atualizarPedido,
    apagarPedido
};