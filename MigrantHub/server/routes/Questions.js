const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/QuestionController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/', controllerHandler(QuestionController.getQuestions, req => [req.user._id]));

module.exports = router;
