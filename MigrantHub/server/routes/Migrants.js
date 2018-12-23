const express = require('express');
const { ensureOwner } = require('../middleware/AuthMiddleware');
const MigrantController = require('../controllers/MigrantController');
const router = express.Router();
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/:id', ensureOwner, controllerHandler(MigrantController.getMigrantUser, req => [req.user._id]));
router.put('/:id', ensureOwner, controllerHandler(MigrantController.editMigrantUser, req => [req.user._id, req.body]));

module.exports = router;
