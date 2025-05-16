const db = require('../banco/database');
const tabela = 'users';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function criarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username) return res.status(400).json({ message: 'Usuário é um campo obrigatório' });
    if (username.length < 4) return res.status(400).json({ message: 'Usuário deve ter no mínimo 6 caracteres' });
    if (password.length < 8) return res.status(400).json({ message: 'Senha deve ter no mínimo 8 caracteres' });
    if (!password) return res.status(400).json({ message: 'Senha é um campo obrigatório' });

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.get(`SELECT * FROM ${tabela} WHERE username = ?`, [username], (err, row) => {
            if (err) return res.status(500).json({ message: 'Erro ao verificar usuário' });
            if (row) return res.status(400).json({ message: 'Usuário já existe' });

            db.run(`INSERT INTO ${tabela} (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
                if (err) return res.status(500).json({ message: 'Erro ao registrar usuário' });
                res.json({ message: 'Usuário registrado com sucesso' });
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar senha' });
    }
}

function logarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    db.get(`SELECT * FROM ${tabela} WHERE username = ?`, [username], (err, user) => {
        if (err) return res.status(500).json({ message: 'Erro ao acessar banco de dados' });
        if (!user) return res.status(400).json({ message: 'Usuário não foi encontrado' });

        // Verificar senha dentro do callback
        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) return res.status(500).json({ message: 'Erro interno ao verificar senha' });
            if (!isMatch) return res.status(401).json({ message: 'Senha digitada incorreta' });

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
}

module.exports = {
    criarUsuario,
    logarUsuario
};