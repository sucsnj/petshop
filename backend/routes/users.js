var express = require('express');
var router = express.Router();
const autenticarToken = require('../middleware/auth');
require('dotenv').config();

const {
    criarUsuario,
    logarUsuario
} = require('../model/users');

// trecho com estrutura para requisições de segurança (token)
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuários
 *     description: Cria um novo usuário com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/register', (req, res) => { // /users/register POST - cria um novo usuário
    criarUsuario(req, res);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags:
 *       - Usuários
 *     description: Faz login de um usuário com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Dados inválidos
 */
router.post('/login', (req, res) => { // users/login POST - faz o login de um usuário
    logarUsuario(req, res);
});
     
// ver perfis
/**
 * @swagger
 * /users/perfil:
 *   get:
 *     summary: Retorna o perfil do usuário logado
 *     tags:
 *       - Usuários
 *     description: Retorna o perfil do usuário logado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *       401:
 *         description: Usuário não logado
 */
router.get('/perfil', autenticarToken, (req, res) => {              // users/perfil GET - retorna o perfil do usuário logado
    res.json({ message: 'Acesso autorizado!', user: req.user });    // o token deve ser devolvido sem aspas
});

module.exports = router;
