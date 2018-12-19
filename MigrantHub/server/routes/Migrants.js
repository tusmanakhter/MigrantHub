const express = require('express');
const { ensureOwner } = require('../middleware/AuthMiddleware');
const MigrantController = require('../controllers/MigrantController');

const router = express.Router();


router.get('/:id', ensureOwner, MigrantController.getMigrantUser);
router.put('/:id', ensureOwner, MigrantController.editMigrantUser);

module.exports = router;
