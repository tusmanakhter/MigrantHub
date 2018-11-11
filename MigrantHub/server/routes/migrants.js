const express = require('express');

const router = express.Router();
const migrantController = require('../controllers/migrantController');
const accountController = require('../controllers/accountController');

router.get('/:id', accountController.ensureOwner, migrantController.getMigrantUser);
router.put('/:id', accountController.ensureOwner, migrantController.editMigrantUser);

module.exports = router;
