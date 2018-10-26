var express = require('express');
var router = express.Router();

router.use('/account', require('./account'))
router.use('/admin', require('./admin'))
router.use('/services', require('./services'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
