const express = require('express');
const { ensureUser, ensureRole } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.use('/accounts', require('./Accounts'));
router.use('/admins', ensureUser, ensureRole('admin'), require('./Admins'));
router.use('/migrants', ensureUser, ensureRole('migrant'), require('./Migrants'));
router.use('/businesses', ensureUser, ensureRole('business'), require('./Businesses'));
router.use('/services', require('./Services'));
router.use('/friend', ensureUser, ensureRole('migrant'), require('./Friend'));
router.use('/events', require('./Events'));

module.exports = router;
