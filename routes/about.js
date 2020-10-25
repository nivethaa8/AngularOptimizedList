var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'home' });
});

router.get('/:id', function(req, res, next) {
  res.send(req.params.id);
});

module.exports = router;
