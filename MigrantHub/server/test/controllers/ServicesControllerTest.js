var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServicesController = require('../../controllers/ServicesController')
var ServicesFactory = require('../factories/ServicesFactory');
var ReviewServiceFactory = require('../factories/ReviewServiceFactory');
var ReviewService = require('../../models/ReviewService');
var User = require('../../models/User');
var ServicesService = require('../../service/ServicesService');
var chai = require('chai');

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
                editOwner: "test@test.com",
                search: true,
                searchQuery: 'test',
            },
            params: {
                id: "5bda52305ccfd051484ea790"
            }
        },
        res = {},
        service = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        },
        migrant = {
            _id: "test@hotmail.com",
            type: "migrant"
        },
        admin = {
            _id: "test@hotmail.com",
            type: "admin"
        },
        business = {
            _id: "test@hotmail.com",
            type: "business"
        },
        invalidMigrant = {
            _id: "invalid@hotmail.com",
            type: "migrant"
        };

    it('should call createService service with correct parameters from createService controller', test(async function () {
        this.stub(ServicesService, 'createService');
        ServicesController.createService(req.user, ServicesFactory.validServiceData());
        assert.calledWith(await ServicesService.createService, req.user, ServicesFactory.validServiceData());
    }));

    it('should call getServices service with correct parameters from createService controller', test(async function () {
        this.stub(ServicesService, 'getServices');
        ServicesController.getServices(req.query.editOwner, req.query.searchQuery, req.query.search);
        assert.calledWith(await ServicesService.getServices, req.query.editOwner, req.query.searchQuery, req.query.search);
    }));

    it('should call getService service with correct parameters from getService controller', test(async function () {
        this.stub(ServicesService, 'getService');
        ServicesController.getService(service._id);
        assert.calledWith(await ServicesService.getService, service._id);
    }));

    it('should call updateService service with correct parameters from updateService controller', test(async function () {
        this.stub(ServicesService, 'updateService');
        ServicesController.updateService(ServicesFactory.validServiceData());
        assert.calledWith(await ServicesService.updateService, ServicesFactory.validServiceData());
    }));

    it('should call deleteService service with merchant service owner from deleteService controller', test(async function () {
        this.stub(ServicesService, 'getService').returns(ServicesFactory.validServiceData());
        this.stub(ServicesService, 'deleteService');
        ServicesController.deleteService(migrant, service._id);
        assert.calledWith(await ServicesService.getService, service._id);
        assert.calledWith(await ServicesService.deleteService, service._id);
    }));

    it('should call deleteService service with business service owner from deleteService controller', test(async function () {
        this.stub(ServicesService, 'getService').returns(ServicesFactory.validServiceData());
        this.stub(ServicesService, 'deleteService');
        ServicesController.deleteService(business, service._id);
        assert.calledWith(await ServicesService.getService, service._id);
        assert.calledWith(await ServicesService.deleteService, service._id);
    }));

    it('should call deleteService service with business service owner from deleteService controller', test(async function () {
        this.stub(ServicesService, 'getService').returns(ServicesFactory.validServiceData());
        this.stub(ServicesService, 'deleteService');
        ServicesController.deleteService(admin, service._id);
        assert.calledWith(await ServicesService.getService, service._id);
        assert.calledWith(await ServicesService.deleteService, service._id);
    }));

    it('should call deleteService service with invalid service owner from deleteService controller', test(async function () {
        this.stub(ServicesService, 'getService').returns(ServicesFactory.validServiceData());
        try {
            chai.expect(await ServicesController.deleteService(invalidMigrant, service._id)).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call deleteService service with invalid user from createService deleteService', test(async function () {
        this.stub(ServicesService, 'getService').returns(ServicesFactory.validServiceData());
        try {
            chai.expect(await ServicesController.deleteService(null, service._id)).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});

describe('Service controller for reviews', function () {

    let req = {
            serviceId: "5be7c2e218d96e03298b71c3",
            body: {
                serviceDetails: ReviewServiceFactory.validReviewData()
            },
            user: {
                _id: "test@test.com",
                type: "admin",
            },
            params: {
                id: "5bda52305ccfd051484ea790",
            },
        },
        error = new Error({ error: "err" }),
        res = {};

    beforeEach(function () {
        status = stub();
        send = spy();
        res = { send, status };
        status.returns(res);
    });

    it('should return error message if error finding reviews', test(function () {
        this.stub(ReviewService, 'find').yields(error);
        ServicesController.getServiceReviews(req, res);
        assert.calledWith(ReviewService.find);
        assert.calledWith(res.send, "There was an error getting service.");
    }));

    it('should find the reviews with no error', test(function () {
        this.stub(ReviewService, 'find').yields(null);
        ServicesController.getServiceReviews(req, res);
        assert.calledWith(ReviewService.find);
        assert.calledWith(res.send);
    }));

    it('should delete a review', test(async function () {
        this.stub(ReviewService, 'findOne').returns(null);
        this.stub(User, 'findOne').returns(req.user);
        this.stub(ReviewService, 'deleteOne').yields(null);
        ServicesController.deleteReview(req, res);
        assert.calledWith(await ReviewService.findOne, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(await User.findOne, { _id: "test@test.com" });
        assert.calledWith(await ReviewService.deleteOne, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send);
    }));
});