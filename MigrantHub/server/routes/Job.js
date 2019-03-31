const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const { validateJob } = require('../validators/JobValidator');
const { ensureIsOwner, ensureRole } = require('../middleware/AuthMiddleware');
const UserTypes = require('../lib/UserTypes');
const Job = require('../models/Job');

router.use('/saved', require('./SavedJob'));

router.get('/', controllerHandler(JobController.getJobs, req => [req.user, req.query.owner, req.query.offset, req.query.limit]));
router.get('/:id', controllerHandler(JobController.getJob, req => [req.user, req.query._id]));
router.post('/', ensureRole(UserTypes.BUSINESS), validateJob, controllerHandler(JobController.createJob, req => [req.user, req.body, req]));
router.put('/:id', ensureIsOwner(Job, false, true, false), validateJob, controllerHandler(JobController.updateJob, req => [req.body, req]));
router.delete('/:id', ensureIsOwner(Job, false, true, true), controllerHandler(JobController.deleteJob, req => [req.params.id]));

module.exports = router;
