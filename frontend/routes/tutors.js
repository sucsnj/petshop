var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('layout', { body:'pages/tutors', title: 'Tutores' });
});

module.exports = router;