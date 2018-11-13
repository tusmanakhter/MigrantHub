const express = require('express');
const { ensureOwner } = require('../middleware/authMiddleware');
const migrantController = require('../controllers/migrantController');

const router = express.Router();


router.get('/:id', ensureOwner, migrantController.getMigrantUser);
router.put('/:id', ensureOwner, migrantController.editMigrantUser);

module.exports = router;
