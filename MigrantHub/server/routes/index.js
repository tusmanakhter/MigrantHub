var express = require('express');
var accountController = require('../controllers/accountController');
var router = express.Router();

router.use('/account', require('./account'));
router.use('/admins', accountController.ensureUser, accountController.ensureRole("admin"), require('./admin'))
router.use('/services', require('./services'));
router.use('/friend', accountController.ensureUser, accountController.ensureRole("migrant"), require('./friend'))
router.use('/event', require('./event'))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
