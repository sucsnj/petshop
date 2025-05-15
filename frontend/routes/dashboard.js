var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { // tela para fazer o login
  res.render('layout', { body:'pages/dashboard', title: 'Express' });
});

module.exports = router;