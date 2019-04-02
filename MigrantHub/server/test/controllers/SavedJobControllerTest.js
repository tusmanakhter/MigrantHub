var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var SavedJobController = require('../../controllers/SavedJobController');
var SavedJobService = require('../../service/SavedJobService');

describe('Service controller', function () {
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

  it('should call getSavedJobs service with correct parameters from getSavedJobs controller', test(async function () {
    this.stub(SavedJobService, 'getSavedJobs');
    await SavedJobController.getSavedJobs(req.user, req.query.offset, req.query.limit);
    assert.calledWith(SavedJobService.getSavedJobs, req.user, req.query.offset, req.query.limit);
  }));

  it('should call addSavedJob service with correct parameters from addSavedJob controller', test(async function () {
    this.stub(SavedJobService, 'addSavedJob');
    await SavedJobController.addSavedJob(req.user, req.jobId);
    assert.calledWith(SavedJobService.addSavedJob, req.user, req.jobId);
  }));

  it('should call deleteSavedJob service with right parameters from deleteSavedJob controller', test(async function () {
    this.stub(SavedJobService, 'deleteSavedJob');
    await SavedJobController.deleteSavedJob(req.user, req.jobId);
    assert.calledWith(SavedJobService.deleteSavedJob, req.user, req.jobId);
  }));
});