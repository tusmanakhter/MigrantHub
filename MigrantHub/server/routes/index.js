const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.use('/accounts', require('./accounts'));
router.use('/admins', accountController.ensureUser, accountController.ensureRole('admin'), require('./admins'));
router.use('/migrants', accountController.ensureUser, accountController.ensureRole('migrant'), require('./migrants'));
router.use('/businesses', accountController.ensureUser, accountController.ensureRole('business'), require('./businesses'));
router.use('/services', require('./services'));
router.use('/friend', accountController.ensureUser, accountController.ensureRole('migrant'), require('./friend'));
router.use('/events', require('./events'));

module.exports = router;
