const express = require('express');

const router = express.Router();
const ServiceSuggestionController = require('../controllers/ServiceSuggestionController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const ServiceSuggestion = require('../models/ServiceSuggestion');

router.get('/', controllerHandler(ServiceSuggestionController.getSuggestions));
router.post('/', controllerHandler(ServiceSuggestionController.createSuggestion, req => [req.body]));
router.delete('/:id', ensureIsOwner(ServiceSuggestion, false, false, true), controllerHandler(ServiceSuggestionController.deleteSuggestion, req => [req.params.id]));

module.exports = router;
