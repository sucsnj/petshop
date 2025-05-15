var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { // tela para fazer o login
  res.render('layout', { body:'pages/login', title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('layout', { body: 'pages/dashboard', title: 'Dashboard' });
});

module.exports = router;