var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var SavedJobFactory = require('../factories/SavedJobFactory');
var SavedJobService = require('../../service/SavedJobService');
var SavedJobRepository = require('../../repository/SavedJobRepository');
var JobRepository = require('../../repository/JobRepository');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('SavedJob Service', function () {
  let req = {
    jobId: '5c987e1a0c6e2045a79958f4',
    jobId2: '5c987e1a0c6e2045a79958f5',
    user: {
      _id: "test@test.com"
    },
    query: {
      offset: 0,
      limit: 10,
    },
    body: SavedJobFactory.validSavedJobData()
  };

  it('should call createSavedJob repository with correct parameters from createSavedJob service',
    test(async function () {
      this.stub(SavedJobRepository, 'createSavedJob');
      await SavedJobService.createSavedJob(req.user._id);
      assert.calledWith(SavedJobRepository.createSavedJob, req.user._id);
  }));

  it('should call getSavedJobs repository with correct parameters from getSavedJobs service (no jobs retrieved)',
    test(async function () {
    this.stub(SavedJobRepository, 'getSavedJobs').returns([]);
    await SavedJobService.getSavedJobs(req.user, req.query.offset, req.query.limit);
    assert.calledWith(SavedJobRepository.getSavedJobs, req.user, req.query.offset, req.query.limit);
  }));

  it('should call getSavedJobs repository with correct parameters from getSavedJobs service (jobs retrieved)',
    test(async function () {
    this.stub(SavedJobRepository, 'getSavedJobs').returns(req.body.savedList);
    this.stub(JobRepository, 'getJobs');
    await SavedJobService.getSavedJobs(req.user, req.query.offset, req.query.limit);
    assert.calledWith(SavedJobRepository.getSavedJobs, req.user, req.query.offset, req.query.limit);
    assert.calledWith(JobRepository.getJobs, {$or: [{ _id: "5c987e1a0c6e2045a79958f4" },
      { _id: "5c987e1a0c6e2045a79958f5" }] ,deleted: false});
  }));

  it('should call addSavedJob repository with correct parameters from addSavedJob service', test(async function () {
    this.stub(SavedJobRepository, 'getSavedJob').returns(null);
    this.stub(SavedJobRepository, 'addSavedJob');
    await SavedJobService.addSavedJob(req.user, req.jobId);
    assert.calledWith(SavedJobRepository.getSavedJob, req.user._id, req.jobId);
    assert.calledWith(SavedJobRepository.addSavedJob, req.user._id, { _id: req.jobId, deleted: false } );
  }));

  it('should call updateSavedJob repository with correct parameters from addSavedJob service to update saved job ' +
    'from deleted to not deleted', test(async function () {
    this.stub(SavedJobRepository, 'getSavedJob').returns(req.body);
    this.stub(SavedJobRepository, 'updateSavedJob');
    await SavedJobService.addSavedJob(req.user, req.jobId2);
    assert.calledWith(SavedJobRepository.getSavedJob, req.user._id, req.jobId2);
    assert.calledWith(SavedJobRepository.updateSavedJob, req.user._id, req.jobId2,
      { $set: { 'savedList.$.deleted': false, 'savedList.$.deletedDate': null } });
  }));

  it('should call updateSavedJob repository with correct parameters from deleteSavedJob service',
    test(async function () {
    this.stub(SavedJobRepository, 'updateSavedJob');
    this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
    await SavedJobService.deleteSavedJob(req.user, req.jobId);
    assert.calledWith(SavedJobRepository.updateSavedJob, req.user._id, req.jobId, { $set: { 'savedList.$.deleted': true,
      'savedList.$.deletedDate': '2018-12-19T00:32:22.749Z' }});
  }));
});