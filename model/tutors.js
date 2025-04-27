const fs = require('fs');
const localDoBanco = 'banco/tutors.json'; // local do banco de dados
const banco = 'tutors';
const db = require('../banco/database');

// function pegarTutores(res, next) {
//     fs.readFile(`${localDoBanco}`, (err, data) => {
//         if (err) {
//             console.error(err);
//             return next(err); // uso do next para retornar o erro > está localizado em app.js
//         }
//         const endpoint = JSON.parse(data);
//         return res.json(endpoint);
//     });
// }

function pegarTutores(res, next) {
    db.all(`SELECT * FROM ${banco}`, (err, data) => {
        if (err) {
            console.error(err);
            return next(err); // uso do next para retornar o erro > está localizado em app.js
        } else {
            return res.json(data);
        }
    });
}

function pegarTutorPorId(req, res, next) {
    const id = Number(req.params.id); // recebe o id (como string) do tutor a ser deletado e converte para numero
    db.all(`SELECT * FROM ${banco} WHERE id = ?`, [id], (err, data) => {
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

function criarTutor(req, res) {
    const email = req.body.email;
    db.get(`
        SELECT email FROM ${banco} WHERE email = ?`, [email], (err, row) => {
        if (row) {
            return res.json('Email já cadastrado.')
        }

        db.all(`INSERT INTO ${banco} 
                (name, email, phone)
                values
                ('${req.body.name}', '${req.body.email}', '${req.body.phone}')
                `, (err, data) => {
            return res.json('Elemento inserido!');
        });
    });
}

function atualizarTutor(req, res) {
    const id = Number(req.params.id);
    const { name, email, phone } = req.body;

    db.get(`SELECT * FROM ${banco} WHERE id= ?`, [id], (err, row) => {
        if (!row) {
            return res.json('Id não encontrado.')
        }

        const nameAtualizado = name && name.trim() !== "" ? name : row.name;
        const emailAtualizado = email && email.trim() !== "" ? email : row.email;
        const phoneAtualizado = phone && phone.trim() !== "" ? phone : row.phone;
        db.run(`UPDATE ${banco} 
            SET name=?, email=?, phone=? 
            WHERE id=?`, [nameAtualizado, emailAtualizado, phoneAtualizado, id], function (err) {
            if (err) {
                console.error(err);
                return res.json('Erro ao atualizar o registro.');
            }
            return res.json('Elemento atualizado!');
        });
    });
}

function apagarTutor(req, res) {
    const id = Number(req.params.id);
    db.get(`SELECT * FROM ${banco} WHERE id= ?`, [id], (err, rows) => {
        if (!rows) {
            return res.json('Id não encontrado.')
        }
        db.all(`DELETE FROM ${banco} WHERE id= ?`, [id], (err, apagado) => {
            return res.json('Elemento apgado!');
        });
    });
}

module.exports = {
    pegarTutores,
    pegarTutorPorId,
    criarTutor,
    atualizarTutor,
    apagarTutor
};