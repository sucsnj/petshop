var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('layout', { body:'pages/contato', title: 'Contato' });
});

module.exports = router;
