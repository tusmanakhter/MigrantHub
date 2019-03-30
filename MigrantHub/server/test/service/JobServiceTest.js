var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var JobService = require('../../service/JobService');
var JobRepository = require('../../repository/JobRepository');
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
            },
        };

    it('should call createJob repository with correct parameters from createJob job', test(async function () {
        this.stub(JobRepository, 'createJob');
        this.stub(ExpressValidator, 'validationResult').returns({isEmpty: ()=>{return true;}});
        await JobService.createJob(req.user, req.body);
        assert.calledWith(JobRepository.createJob, req.user._id, req.body);
    }));

    it('should call createJob repository with error in validation from createJob job', test(function () {
        this.stub(JobRepository, 'createJob');
      this.stub(ExpressValidator, 'validationResult').returns({isEmpty: ()=>{return false;}});
        return chai.assert.isRejected(JobService.createJob(req.user._id, req.body), ServerError, 'There was an error creating job.');
    }));

    it('should call getJobs repository to retrieve jobs', test(async function () {
        this.stub(JobRepository, 'getJobs').returns([]);
        await JobService.getJobs(req.query.offset, req.query.limit);
        assert.calledWith(JobRepository.getJobs, { deleted: false }, req.query.offset, req.query.limit);
    }));
});