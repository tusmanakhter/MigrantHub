const express = require('express');

const router = express.Router();
const BugController = require('../controllers/BugController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.post('/', controllerHandler(BugController.createBug, req => [req.user, req.body]));
router.get('/', controllerHandler(BugController.getBugs, () => []));
router.get('/:id', controllerHandler(BugController.getBugs, req => [req.query._id]));

module.exports = router;
