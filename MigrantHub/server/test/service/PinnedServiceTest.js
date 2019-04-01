var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var axios = require('axios');
var PinnedService = require('../../service/PinnedServiceService');
var PinnedServiceRepository = require('../../repository/PinnedServiceRepository');
var ServiceRepository = require('../../repository/ServiceRepository');
var ReviewRepository = require('../../repository/ReviewRepository');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Pinned Service', function () {
    let req = {
            user: {
                _id: "test@test.com"
            },
            query: {
                _id: "5bda52305ccfd051484ea790",
                editOwner: "test@test.com",
                search: 'true',
                searchQuery: 'test',
            },
            params: {
                id: "5bda52305ccfd051484ea790"
            }
        }

    it('should call createPinnedService repository with correct parameters from createPinnedService service', test(async function () {
        this.stub(PinnedServiceRepository, 'createPinnedService');
        await PinnedService.createPinnedService(req.user._id);
        assert.calledWith(PinnedServiceRepository.createPinnedService, req.user._id);
    }));

});