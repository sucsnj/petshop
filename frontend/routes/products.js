var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('layout', { body:'pages/products', title: 'Produtos' });
});

module.exports = router;