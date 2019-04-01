var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var JobService = require('../../service/JobService');
var JobRepository = require('../../repository/JobRepository');
var SavedJobRepository = require('../../repository/SavedJobRepository');
var JobFactory = require('../factories/JobFactory');
var { ServerError } = require('../../errors/ServerError');
var ExpressValidator = require('express-validator/check');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Job Service', function () {
    let req = {
      body: JobFactory.validJobData(),
      user: {
          _id: "test@test.com"
      },
      query: {
        _id: "5c987e1f0c6e2045a7995900",
        offset: 0,
        limit: 10,
        owner: "test@test.com"
      },
    };

    it('should call createJob repository with correct parameters from createJob service', test(async function () {
        this.stub(JobRepository, 'createJob');
        this.stub(ExpressValidator, 'validationResult').returns({isEmpty: ()=>{return true;}});
        await JobService.createJob(req.user, req.body);
        assert.calledWith(JobRepository.createJob, req.user._id, req.body);
    }));

    it('should call createJob repository with error in validation from createJob service', test(function () {
        this.stub(JobRepository, 'createJob');
      this.stub(ExpressValidator, 'validationResult').returns({isEmpty: ()=>{return false;}});
        return chai.assert.isRejected(JobService.createJob(req.user._id, req.body), ServerError, 'There was an error creating job.');
    }));

    it('should call getJobs repository to retrieve jobs', test(async function () {
      this.stub(JobRepository, 'getJobs').returns([]);
      this.stub(SavedJobRepository, 'getSavedJob').returns([]);
      await JobService.getJobs(req.user, req.user._id,);
        assert.calledWith(JobRepository.getJobs, { deleted: false, user: req.user._id });
    }));

  it('should call updateJob repository with correct parameters from updateJob service', test(async function () {
    this.stub(JobRepository, 'updateJob');
    this.stub(ExpressValidator, 'validationResult').returns({isEmpty: ()=>{return true;}});
    await JobService.updateJob(req.body);
    assert.calledWith(JobRepository.updateJob, req.body);
  }));

  it('should call updateJob repository with error in validation from updateJob service', test(function () {
    this.stub(JobRepository, 'updateJob');
    this.stub(ExpressValidator, 'validationResult').returns({isEmpty: ()=>{return false;}});
    return chai.assert.isRejected(JobService.updateJob(req.body), ServerError, 'There was an error updating job.');

  }));

  it('should call deleteJob repository from deleteJob service', test(async function () {
    this.stub(JobRepository, 'deleteJob');
    await JobService.deleteJob(req.body._id);
    assert.calledWith(JobRepository.deleteJob, req.body._id);
  }));
});