var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var SavedJobRepository = require('../../repository/SavedJobRepository');
var SavedJob = require('../../models/SavedJob');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('SavedJob Repository', function () {
  let req = {
    jobId: '5ca0d1d27a7b64c584d272ce',
    user: {
      _id: "test@test.com"
    },
    query: {
      offset: 0,
      limit: 10,
    }
  };

  it('should successfully call mongodb save to createSavedJob', test(function () {
      this.stub(SavedJob.prototype, 'save').returns(Promise.resolve({}));
      return chai.assert.isFulfilled(SavedJobRepository.createSavedJob(req.user._id), 'Saved job has been created.');
  }));

  it('should throw error, since there was a error saving job', test( function () {
      this.stub(SavedJob.prototype, 'save').returns(Promise.reject({}));
      return chai.assert.isRejected(SavedJobRepository.createSavedJob(req.user._id), ServerError,
        'There was an error creating saved job.');
  }));

  it('should successfully call mongodb find to getSavedJobs with offset and limit', test(function () {
    this.stub(SavedJob, 'aggregate').returns({skip: sinon.stub().returns({limit: sinon.stub()
      .returns({exec: sinon.stub().returns(Promise.resolve({}))})})});
    SavedJobRepository.getSavedJobs({ _id: req.user._id } , req.query.offset, req.query.limit);
    assert.calledWith(SavedJob.aggregate, [
      { $match: { _id: req.user._id } },
      { $unwind: '$savedList' },
      { $replaceRoot: { newRoot: '$savedList' } },
      { $match: { deleted: false } },
    ]);
  }));

  it('should throw error, since there was a error getting all saved jobs with offset and limit', test(function () {
    this.stub(SavedJob, 'aggregate').returns({skip: sinon.stub().returns({limit: sinon.stub()
      .returns({exec: sinon.stub().returns(Promise.reject({}))})})});
    return chai.assert.isRejected(SavedJobRepository.getSavedJobs({ _id: req.user._id } ,
      req.query.offset, req.query.limit), ServerError, 'There was an error retrieving saved jobs.');
  }));

  it('should successfully call mongodb findOne to getSavedJobs', test(function () {
    this.stub(SavedJob, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedJobRepository.getSavedJobs({ _id: req.user._id } , undefined, undefined);
    assert.calledWith(SavedJob.findOne, { _id: req.user._id });
  }));

  it('should throw error, since there was a error getting all saved jobs', test(function () {
    this.stub(SavedJob, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedJobRepository.getSavedJobs({ _id: req.user._id }, undefined,
      undefined), ServerError, 'There was an error retrieving saved jobs.');
  }));


  it('should successfully call mongodb findOne to saved jobz', test(function () {
    this.stub(SavedJob, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedJobRepository.getSavedJob(req.user._id, req.jobId);
    assert.calledWith(SavedJob.findOne, {_id: req.user._id, 'savedList._id': req.jobId});
  }));

  it('should throw error, since there was a error getting service', test(function () {
    this.stub(SavedJob, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedJobRepository.getSavedJob(req.user._id, req.jobId),
      ServerError, 'There was an error retrieving saved job.');
  }));

  it('should successfully call mongodb update to addSavedJob', test(function () {
    this.stub(SavedJob, 'update').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedJobRepository.addSavedJob(req.user._id, {_id: req.jobId, deleted: false});
    assert.calledWith(SavedJob.update, { _id: req.user._id },
      { $push: { savedList: {_id: req.jobId, deleted: false} } }, { new: true });
  }));

  it('should throw error, since there was a error adding saved job', test(function () {
    this.stub(SavedJob, 'update').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedJobRepository.addSavedJob(req.user._id,
      {_id: req.jobId, deleted: false}), ServerError, 'There was an error saving job in db.');
  }));

  it('should successfully call mongodb update to updateSavedJob', test(function () {
    this.stub(SavedJob, 'update').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedJobRepository.updateSavedJob(req.user._id, req.jobId, {});
    assert.calledWith(SavedJob.update, {_id: req.user._id, 'savedList._id': req.jobId,}, {});
  }));

  it('should throw error, since there was a error updating saved job', test(function () {
    this.stub(SavedJob, 'update').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedJobRepository.updateSavedJob(req.user._id, req.jobId, {}),
      ServerError, 'There was an error updating saved job.');
  }));
});