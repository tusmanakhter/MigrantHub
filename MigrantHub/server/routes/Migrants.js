const express = require('express');
const { ensureOwner } = require('../middleware/AuthMiddleware');
const MigrantController = require('../controllers/MigrantController');

const router = express.Router();
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/:id', ensureOwner, controllerHandler(MigrantController.getMigrantUser, req => [req.user._id]));
router.get('/onboarding/:id', ensureOwner, controllerHandler(MigrantController.onBoardingComplete, req => [req.params.id]));
router.put('/:id', ensureOwner, controllerHandler(MigrantController.editMigrantUser, req => [req.user._id, req.body]));
router.put('/onboarding/:id', ensureOwner, controllerHandler(MigrantController.updateOnBoardingComplete, req => [req.params.id]));

module.exports = router;
