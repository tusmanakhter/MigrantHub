var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServicesController = require('../../controllers/ServicesController')
var ServicesFactory = require('../factories/ServicesFactory');
var Services = require('../../models/Services');

describe('Service controller', function () {

    let req = {
            body: {
                serviceDetails: ServicesFactory.validServiceData()
            },
            user: {
                _id: "test@test.com"
            },
            query: {
                _id: "5bda52305ccfd051484ea790",
                editOwner: "test@test.com"
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

    it('should be able create a new service successfully if data is valid', test(function () {
        let expectedResult = ServicesFactory.validServiceData();
        this.stub(Services.prototype, 'save').yields(null, expectedResult);
        ServicesController.createService(req, res);
        assert.calledWith(Services.prototype.save);
        assert.calledWith(res.send, "Service has been created!");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error creating service', test(function () {
        this.stub(Services.prototype, 'save').yields(error);
        ServicesController.createService(req, res);
        assert.calledWith(Services.prototype.save);
        assert.calledWith(res.send, "There was a error creating service.");
        assert.calledWith(res.status, 400);
    }));

    it('should successfully update service if no errors', test(function () {
        this.stub(Services, 'findByIdAndUpdate');
        ServicesController.updateService(req, res);
        assert.calledWith(Services.findByIdAndUpdate, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "Service updated successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error updating service', test(function () {
        this.stub(Services, 'findByIdAndUpdate').yields(error);
        ServicesController.updateService(req, res);
        assert.calledWith(Services.findByIdAndUpdate, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "There was an error updating service.");
        assert.calledWith(res.status, 400);
    }));

    it('should return services if no error retrieving service data', test(function () {
        this.stub(Services, 'findOne').yields(null);
        ServicesController.getServiceData(req, res);
        assert.calledWith(Services.findOne, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving service data', test(function () {
        this.stub(Services, 'findOne').yields(error);
        ServicesController.getServiceData(req, res);
        assert.calledWith(Services.findOne, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "There was a error getting services.");
        assert.calledWith(res.status, 400);
    }));

    it('should return services if no error retrieving all services', test(function () {
        this.stub(Services, 'find').yields(null);
        ServicesController.viewServices(req, res);
        assert.calledWith(Services.find, { email: "test@test.com" });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving all services', test(function () {
        this.stub(Services, 'find').yields(error);
        ServicesController.viewServices(req, res);
        assert.calledWith(Services.find, { email: "test@test.com" });
        assert.calledWith(res.send, "There was a error getting services.");
        assert.calledWith(res.status, 400);
    }));
});

describe('Service controller search', function () {

    let req = {
            body: {
                serviceDetails: ServicesFactory.validServiceData()
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
        this.stub(Services, 'find').yields(null);
        ServicesController.viewServices(req, res);
        assert.calledWith(Services.find, { '$or': [ { serviceTitle: /test/gi }, { serviceSummary: /test/gi } ] });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving searched services', test(function () {
        this.stub(Services, 'find').yields(error);
        ServicesController.viewServices(req, res);
        assert.calledWith(Services.find, { '$or': [ { serviceTitle: /test/gi }, { serviceSummary: /test/gi } ] });
        assert.calledWith(res.status, 400);
    }));
});