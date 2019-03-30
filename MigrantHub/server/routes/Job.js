const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const { validateJob } = require('../validators/JobValidator');

router.post('/', validateJob, controllerHandler(JobController.createJob, req => [req.user, req.body, req]));

module.exports = router;
