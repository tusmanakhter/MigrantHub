const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.use('/account', require('./account'));
router.use('/admin', accountController.ensureUser, accountController.ensureRole('admin'), require('./admin'));
router.use('/services', require('./services'));
router.use('/friend', accountController.ensureUser, accountController.ensureRole('migrant'), require('./friend'));
router.use('/events', require('./events'));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
