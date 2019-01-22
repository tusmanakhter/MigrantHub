const express = require('express');

const router = express.Router();
const ChatbotController = require('../controllers/ChatbotController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/', controllerHandler(ChatbotController.callChatbot, req => [req.query.string]));
