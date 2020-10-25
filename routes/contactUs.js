var express = require('express');
var router = express.Router();
const BusinessContact = require('../models/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'home' });
});

module.exports = router;
