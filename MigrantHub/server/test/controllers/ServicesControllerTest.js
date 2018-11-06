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
});