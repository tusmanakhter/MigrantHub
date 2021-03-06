const { assert } = require('sinon');
const sinon = require('sinon');
const sinonTest = require('sinon-test');

const test = sinonTest(sinon);
const ServiceController = require('../../controllers/ServiceController');
const ServiceFactory = require('../factories/ServiceFactory');
const ServiceService = require('../../service/ServiceService');

describe('Service controller', function () {
  const req = {
    body: {
      serviceDetails: ServiceFactory.validServiceData(),
    },
    user: {
      _id: 'test@test.com',
    },
    query: {
      _id: '5bda52305ccfd051484ea790',
      editOwner: 'test@test.com',
      search: true,
      searchQuery: 'test',
    },
    params: {
      id: '5bda52305ccfd051484ea790',
    },
  };


  const service = {
    _id: '5bda52305ccfd051484ea790',
    email: 'test@hotmail.com',
    category: 'Employment',
    subcategory: 'SmallBusiness',
  };

  it('should call createService service with correct parameters from createService controller', test(async function () {
    this.stub(ServiceService, 'createService');
    await ServiceController.createService(req.user, req.body.serviceDetails);
    assert.calledWith(ServiceService.createService, req.user, req.body.serviceDetails);
  }));

  it('should call getServices service with correct parameters from createService controller', test(async function () {
    this.stub(ServiceService, 'getServices');
    await ServiceController.getServices(req.query.editOwner, req.query.searchQuery,
      req.query.search, service.category, service.subcategory, req.query.filtered);
    assert.calledWith(ServiceService.getServices, req.query.editOwner,
      req.query.searchQuery, req.query.search, service.category, service.subcategory,
      req.query.filtered);
  }));

  it('should call getService service with correct parameters from getService controller', test(async function () {
    this.stub(ServiceService, 'getService');
    await ServiceController.getService(service._id);
    assert.calledWith(ServiceService.getService, service._id);
  }));

  it('should call updateService service with correct parameters from updateService controller', test(async function () {
    this.stub(ServiceService, 'updateService');
    await ServiceController.updateService(req.body.serviceDetails);
    assert.calledWith(ServiceService.updateService, req.body.serviceDetails);
  }));

  it('should call deleteService service with merchant service owner from deleteService controller', test(async function () {
    this.stub(ServiceService, 'deleteService');
    await ServiceController.deleteService(service._id);
    assert.calledWith(ServiceService.deleteService, service._id);
  }));

  it('should call getRecommendations service with correct parameters from getRecommendations controller', test(async function () {
    this.stub(ServiceService, 'getRecommendations');
    await ServiceController.getRecommendations(req.user);
    assert.calledWith(ServiceService.getRecommendations, req.user);
  }));
});
