const express = require('express');

const router = express.Router();
const JobController = require('../controllers/JobController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const { validateJob } = require('../validators/JobValidator');

router.get('/', controllerHandler(JobController.getJobs, req => [req.query.offset, req.query.limit]));
router.get('/:id', controllerHandler(JobController.getJob, req => [req.query._id]));
router.post('/', validateJob, controllerHandler(JobController.createJob, req => [req.user, req.body, req]));

module.exports = router;
