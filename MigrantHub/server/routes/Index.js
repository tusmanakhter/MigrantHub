const express = require('express');
const { ensureUser, ensureRole } = require('../middleware/AuthMiddleware');
const UserTypes = require('../lib/UserTypes');

const router = express.Router();

router.use('/accounts', require('./Accounts'));
router.use('/admins', ensureUser, ensureRole(UserTypes.ADMIN), require('./Admins'));
router.use('/migrants', ensureUser, ensureRole(UserTypes.MIGRANT), require('./Migrants'));
router.use('/businesses', ensureUser, ensureRole(UserTypes.BUSINESS), require('./Businesses'));
router.use('/services', ensureUser, require('./Services'));
router.use('/friend', ensureUser, ensureRole(UserTypes.MIGRANT), require('./Friend'));
router.use('/events', ensureUser, require('./Events'));
router.use('/questions', ensureUser, ensureRole(UserTypes.MIGRANT), require('./Questions'));
router.use('/useranswers', ensureUser, ensureRole(UserTypes.MIGRANT), require('./UserAnswers'));

module.exports = router;
