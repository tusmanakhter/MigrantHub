const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const Job = require('../models/Job');
const { validateJob } = require('../validators/JobValidator');

router.get('/', controllerHandler(JobController.getJobs, req => [req.query.offset, req.query.limit]));
router.post('/', validateJob, controllerHandler(JobController.createJob, req => [req.user, req.body, req]));

module.exports = router;
