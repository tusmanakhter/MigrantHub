const express = require('express');
const { ensureUser, ensureRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/accounts', require('./accounts'));
router.use('/admins', ensureUser, ensureRole('admin'), require('./admins'));
router.use('/migrants', ensureUser, ensureRole('migrant'), require('./migrants'));
router.use('/businesses', ensureUser, ensureRole('business'), require('./businesses'));
router.use('/services', require('./services'));
router.use('/friend', ensureUser, ensureRole('migrant'), require('./friend'));
router.use('/events', require('./events'));

module.exports = router;
