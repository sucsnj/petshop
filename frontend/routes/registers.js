var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('layout', { body: 'pages/registers', title: 'Cadastro' });
});

module.exports = router;