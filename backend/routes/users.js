var express = require('express');
var router = express.Router();
const autenticarToken = require('../middleware/auth');
require('dotenv').config();

const {
    criarUsuario,
    logarUsuario
} = require('../model/users');


router.post('/register', (req, res) => { // /users/register POST - cria um novo usuário
    criarUsuario(req, res);
});

router.post('/login', (req, res) => { // users/login POST - faz o login de um usuário
    logarUsuario(req, res);
});
     
                                                                    // users/perfil GET - retorna o perfil do usuário logado
router.get('/perfil', autenticarToken, (req, res) => {              // o token deve ser devolvido sem aspas
    res.json({ message: 'Acesso autorizado!', user: req.user });
});

module.exports = router;
