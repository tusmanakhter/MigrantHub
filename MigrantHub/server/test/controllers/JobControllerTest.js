var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var JobController = require('../../controllers/JobController');
var JobFactory = require('../factories/JobFactory');
var JobService = require('../../service/JobService');

describe('Job controller', function () {
  let req = {
      body: JobFactory.validJobData(),
      user: {
        _id: "test@test.com"
      },
      query: {
        _id: "5c987e1f0c6e2045a7995900",
        offset: 0,
        limit: 10,
        owner: "test@test.com",
        searchQuery: "Test",
        search: true,
      }
    };

  it('should call createJob service with correct parameters from createJob controller', test(async function () {
    this.stub(JobService, 'createJob');
    await JobController.createJob(req.user, req.body);
    assert.calledWith(JobService.createJob, req.user, req.body);
  }));

  it('should call getJobs service with correct parameters from createJob controller', test(async function () {
    this.stub(JobService, 'getJobs');
    await JobController.getJobs(req.query.offset, req.query.limit);
    assert.calledWith(JobService.getJobs, req.query.offset, req.query.limit);
  }));

  it('should call getJobs service with correct parameters from createJob controller', test(async function () {
    this.stub(JobService, 'getJobs');
    await JobController.getJobs(req.user, req.searchQuery, req.search, req.query.offset, req.query.limit);
    assert.calledWith(JobService.getJobs, req.user, req.searchQuery, req.search, req.query.offset, req.query.limit);
  }));

  it('should call getJob service with correct parameters from getJob controller', test(async function () {
    this.stub(JobService, 'getJob');
    await JobController.getJob(req.body_id);
    assert.calledWith(JobService.getJob, req.body_id);
  }));

  it('should call updateJob service with correct parameters from updateJob controller', test(async function () {
    this.stub(JobService, 'updateJob');
    await JobController.updateJob(req.body);
    assert.calledWith(JobService.updateJob, req.body);
  }));

  it('should call deleteJob service from deleteJob controller', test(async function () {
    this.stub(JobService, 'deleteJob');
    await JobController.deleteJob(req.body._id);
    assert.calledWith(JobService.deleteJob, req.body._id);
  }));
});