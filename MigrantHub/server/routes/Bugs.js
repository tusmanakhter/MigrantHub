const express = require('express');

const router = express.Router();
const BugController = require('../controllers/BugController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.post('/', controllerHandler(BugController.createBug, req => [req.user, req.body]));
router.get('/', controllerHandler(BugController.getBugs, () => []));
router.get('/:id', controllerHandler(BugController.getBug, req => [req.query._id]));
router.put('/:id', controllerHandler(BugController.updateBug, req => [req.params.id, req.body]));

module.exports = router;
