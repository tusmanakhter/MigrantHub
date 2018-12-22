var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceController = require('../../controllers/ServiceController')
var ServiceFactory = require('../factories/ServiceFactory');
var Service = require('../../models/Service');
var User = require('../../models/User');

describe('Service controller', function () {
    let req = {
        body: {
            serviceDetails: ServiceFactory.validServiceData()
        },
        user: {
            _id: "test@test.com"
        },
        query: {
            _id: "5bda52305ccfd051484ea790",
            editOwner: "test@test.com"
        },
        params: {
            id: "5bda52305ccfd051484ea790"
        }
    },
    error = new Error({ error: "err" }),
    res = {},
    service = {
        _id: "5bda52305ccfd051484ea790",
        user: "test@test.com"
    },
    user = {
        _id: "test@test.com",
        type: "migrant"
    },
    admin = {
        _id: "test@test.com",
        type: "admin"
    }

    beforeEach(function () {
        status = stub();
        send = spy();
        res = { send, status };
        status.returns(res);
    });

    it('should be able create a new service successfully if data is valid', test(function () {
        let expectedResult = ServiceFactory.validServiceData();
        this.stub(Service.prototype, 'save').yields(null, expectedResult);
        ServiceController.createService(req, res);
        assert.calledWith(Service.prototype.save);
        assert.calledWith(res.send, "Service has been created!");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error creating service', test(function () {
        this.stub(Service.prototype, 'save').yields(error);
        ServiceController.createService(req, res);
        assert.calledWith(Service.prototype.save);
        assert.calledWith(res.send, "There was an error creating service.");
        assert.calledWith(res.status, 400);
    }));

    it('should successfully update service if no errors', test(function () {
        this.stub(Service, 'findByIdAndUpdate');
        ServiceController.updateService(req, res);
        assert.calledWith(Service.findByIdAndUpdate, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "Service updated successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error updating service', test(function () {
        this.stub(Service, 'findByIdAndUpdate').yields(error);
        ServiceController.updateService(req, res);
        assert.calledWith(Service.findByIdAndUpdate, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "There was an error updating service.");
        assert.calledWith(res.status, 400);
    }));

    it('should return services if no error retrieving service data', test(function () {
        this.stub(Service, 'findOne').yields(null);
        ServiceController.getServiceData(req, res);
        assert.calledWith(Service.findOne, { _id: "5bda52305ccfd051484ea790", deleted: false });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving service data', test(function () {
        this.stub(Service, 'findOne').yields(error);
        ServiceController.getServiceData(req, res);
        assert.calledWith(Service.findOne, { _id: "5bda52305ccfd051484ea790", deleted: false });
        assert.calledWith(res.send, "There was an error getting services.");
        assert.calledWith(res.status, 400);
    }));

    it('should return services if no error retrieving all services', test(function () {
        this.stub(Service, 'find').yields(null);
        ServiceController.viewServices(req, res);
        assert.calledWith(Service.find, { user: "test@test.com", deleted: false });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving all services', test(function () {
        this.stub(Service, 'find').yields(error);
        ServiceController.viewServices(req, res);
        assert.calledWith(Service.find, { user: "test@test.com", deleted: false });
        assert.calledWith(res.send, "There was an error getting services.");
        assert.calledWith(res.status, 400);
    }));

    it('migrant should be able to delete a service', test(async function () {
        this.stub(Service, 'findOne').resolves(service);
        this.stub(User, 'findOne').resolves(user);
        this.stub(Service, 'updateOne').yields(null);
        await ServiceController.deleteService(req, res);
        assert.calledWith(Service.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "Service deleted successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('admin should be able to delete a service', test(async function () {
        this.stub(Service, 'findOne').resolves(service);
        this.stub(User, 'findOne').resolves(admin);
        this.stub(Service, 'updateOne').yields(null);
        await ServiceController.deleteService(req, res);
        assert.calledWith(Service.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "Service deleted successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('should not delete service on error', test(async function () {
        this.stub(Service, 'findOne').returns(service);
        this.stub(User, 'findOne').returns(user);
        this.stub(Service, 'updateOne').yields(error);
        await ServiceController.deleteService(req, res);
        assert.calledWith(Service.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "There was an error deleting service.");
        assert.calledWith(res.status, 400);
    }));
});

describe('Service controller search', function () {

    let req = {
        body: {
            serviceDetails: ServiceFactory.validServiceData()
        },
        user: {
            _id: "test@test.com"
        },
        query: {
            search: true,
            searchQuery: 'test',
            editOwner: ''
        }
    },
   
    error = new Error({ error: "err" }),
    res = {};
  
    beforeEach(function () {
        status = stub();
        send = spy();
        res = { send, status };
        status.returns(res);
    });
  
    it('should return services if no error retrieving searched services', test(function () {
        this.stub(Service, 'find').yields(null);
        ServiceController.viewServices(req, res);
        assert.calledWith(Service.find, { '$or': [ { serviceTitle: /test/gi }, { serviceSummary: /test/gi } ], deleted: false });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving searched services', test(function () {
        this.stub(Service, 'find').yields(error);
        ServiceController.viewServices(req, res);
        assert.calledWith(Service.find, { '$or': [ { serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
        assert.calledWith(res.status, 400);
    }));
});