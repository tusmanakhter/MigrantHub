const express = require('express');
const router = express.Router();
const SavedJobController = require('../controllers/SavedJobController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const UserTypes = require('../lib/UserTypes');
const { ensureRole } = require('../middleware/AuthMiddleware');

router.put('/:id', ensureRole(UserTypes.MIGRANT), controllerHandler(SavedJobController.addSavedJob, req => [req.user, req.params.id]));
router.delete('/:id', ensureRole(UserTypes.MIGRANT), controllerHandler(SavedJobController.deleteSavedJob, req => [req.user, req.params.id]));

module.exports = router;
