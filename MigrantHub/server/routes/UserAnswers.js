const express = require('express');

const router = express.Router();
const UserAnswerController = require('../controllers/UserAnswerController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.post('/', controllerHandler(UserAnswerController.addUserAnswer, req => [req.user._id, req.body]));

module.exports = router;
