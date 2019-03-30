var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var JobRepository = require('../../repository/JobRepository');
var JobFactory = require('../factories/JobFactory');
var Job = require('../../models/Job');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Job Repository', function () {
    let req = {
            body: JobFactory.validJobData(),
            user:{
                _id: "test@test.com"
            },
        };

    it('should successfully call mongodb save to createJob', test(function () {
        this.stub(Job.prototype, 'save').returns(Promise.resolve({}));
        return chai.assert.isFulfilled(JobRepository.createJob(req.user._id, {}), 'Job has been created.');
    }));

    it('should throw error, since there was a error saving job', test( function () {
        this.stub(Job.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(JobRepository.createJob(req.user._id, {}), ServerError, 'There was an error creating job.');
    }));

    it('should successfully call mongodb find to findJobs', test(function () {
        this.stub(Job, 'find').returns({sort: sinon.stub().returns({exec: sinon.stub().returns(Promise.resolve({}))})});
        JobRepository.getJobs({ deleted: false });
        assert.calledWith(Job.find, { deleted: false });
    }));

    it('should throw error, since there was a error getting all jobs', test(function () {
        this.stub(Job, 'find').returns({sort: sinon.stub().returns({exec: sinon.stub().returns(Promise.reject({}))})});
        return chai.assert.isRejected(JobRepository.getJobs({ deleted: false }), ServerError, 'There was an error retrieving jobs.');
    }));

    it('should successfully call mongodb findOne to findOneJob', test(function () {
        this.stub(Job, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        JobRepository.getJob({ _id: req.body._id, deleted: false });
        assert.calledWith(Job.findOne, { _id: req.body._id, deleted: false });
    }));

    it('should throw error, since there was a error getting job', test(function () {
        this.stub(Job, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(JobRepository.getJob({ _id: req.body._id, deleted: false }), ServerError, 'There was an error retrieving job.');
    }));

  it('should successfully call mongodb findByIdAndUpdate to updateJob', test(function () {
    this.stub(Job, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    JobRepository.updateJob(req.body);
    assert.calledWith(Job.findByIdAndUpdate, { _id: req.body._id}, req.body, { new: true });
  }));

  it('should throw error, since there was a error updating job', test(function () {
    this.stub(Job, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(JobRepository.updateJob(req.body), ServerError, 'There was an error updating job in db.');
  }));

  it('should successfully call mongodb updateOne to deleteJob', test(function () {
    this.stub(Job, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
    JobRepository.deleteJob(req.body._id);
    assert.calledWith(Job.updateOne, { _id: req.body._id }, { deleted: true, deletedDate: Date.now() });
  }));

  it('should throw error, since there was a error deleting job', test(function () {
    this.stub(Job, 'updateOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(JobRepository.deleteJob(req.body._id), ServerError, 'There was an error deleting job.');
  }));
});