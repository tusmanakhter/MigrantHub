const express = require('express');
const SavedEventController = require('../controllers/SavedEventController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const UserTypes = require('../lib/UserTypes');
const { ensureRole } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/', ensureRole(UserTypes.MIGRANT), controllerHandler(SavedEventController.getSavedEvents, req => [req.user, req.query.offset, req.query.limit]));
router.put('/:id', ensureRole(UserTypes.MIGRANT), controllerHandler(SavedEventController.addSavedEvent, req => [req.user, req.params.id]));
router.delete('/:id', ensureRole(UserTypes.MIGRANT), controllerHandler(SavedEventController.deleteSavedEvent, req => [req.user, req.params.id]));

module.exports = router;
