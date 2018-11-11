const express = require('express');

const router = express.Router();
const migrantController = require('../controllers/migrantController');

router.get('/:id', migrantController.getMigrantUser);
router.put('/:id', migrantController.editMigrantUser);

module.exports = router;
