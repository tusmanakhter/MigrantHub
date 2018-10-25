var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/accountController')
var Admin = require('../../models/Admin')
var MigrantUser = require('../../models/MigrantUser')
var BusinessUser = require('../../models/BusinessUser')

describe('account controller migrant', function () {
  let req = {
    body: {
      proficiencyExams : {
          ielts : "false",
          french : "true",
          others : "Computer Programming"
      },
      languages : [
          {
              name : "French",
              writingLevel : "beginner",
              speakingLevel : "beginner"
          }
      ],
      family : [
          {
              age : "14",
              gender : "male",
              relation : "brother",
              relationshipStatus : "single"
          },
          {
              age : "50",
              gender : "female",
              relation : "mother",
              relationshipStatus : "married"
          },
          {
              age : "51",
              gender : "male",
              relation : "father",
              relationshipStatus : "married"
          }
      ],
      workExperience : [
          {
              title : "Admin",
              company : "Concordia",
              years : "2"
          }
      ],
      email : "test@test.com",
      password : "testtest",
      confirmPassword : "testtest",
      firstName : "test",
      lastName : "test",
      address : "1455 Boulevard de Maisonneuve O",
      apartment : "",
      city : "Montreal",
      province : "QC",
      postalCode : "H3G 1M8",
      phoneNumber : "(514) 848-2424",
      age : "22",
      gender : "male",
      nationality : "Canadian",
      relationshipStatus : "single",
      status : "citizen",
      writingLevel : "intermediate",
      speakingLevel : "intermediate",
      motherTongue : "English",
      educationLevel : "secondary",
      jobStatus : "student",
      lookingForJob : "false",
      currentIncome : "15000",
      settlingLocation : "LAVAL, QC",
      settlingDuration : "15",
      joiningReason : "help"
    }
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;

  beforeEach(function () {
    res = {
        send: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
    };
  });

  it('should create a migrant', test(function () {
    expectedResult = req.body
    this.stub(MigrantUser.prototype, 'save').yields(null, expectedResult);
    Controller.createUser(req, res);
    sinon.assert.calledWith(MigrantUser.prototype.save);
    sinon.assert.calledWith(res.send, "User has been added!");
  }));

  it('should return error message on save migrant error', test(function () {
    this.stub(MigrantUser.prototype, 'save').yields(error);
    Controller.createUser(req, res);
    sinon.assert.calledWith(MigrantUser.prototype.save);
    sinon.assert.calledWith(res.send , "There was a error saving user.");
  }));
});

describe('account controller business', function () {
  let req = {
    body: {
      email : "test@test.com",
      password : "testtest",
      confirmPassword : "testtest",
      firstName : "test",
      lastName : "test",
      address : "1455 Boulevard de Maisonneuve O",
      apartment : "",
      city : "Montreal",
      province : "QC",
      postalCode : "H3G 1M8",
      phoneNumber : "(514) 848-2424",
      corpId: '1112223',
      organizationName: 'test',
      orgType: 'test',
      department: 'test',
      serviceType: 'test',
      description: 'test',
    }
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;

  beforeEach(function () {
    res = {
        send: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
    };
  });

  it('should create a business user', test(function () {
    expectedResult = req.body
    this.stub(BusinessUser.prototype, 'save').yields(null, expectedResult);
    Controller.createBusiness(req, res);
    sinon.assert.calledWith(BusinessUser.prototype.save);
    sinon.assert.calledWith(res.send, "Business user has been added!");
  }));

  it('should return error message on save business user error', test(function () {
    this.stub(BusinessUser.prototype, 'save').yields(error);
    Controller.createBusiness(req, res);
    sinon.assert.calledWith(BusinessUser.prototype.save);
    sinon.assert.calledWith(res.send , "There was a error saving business user.");
  }));
});

describe('account controller admin', function () {
  let req = {
    body: {
      email : "test@test.com",
      password : "testtest",
      confirmPassword : "testtest"
    }
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;

  beforeEach(function () {
    res = {
        send: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
    };
  });

  it('should create an admin', test(function () {
    expectedResult = req.body
    this.stub(Admin.prototype, 'save').yields(null, expectedResult);
    Controller.createAdmin(req, res);
    sinon.assert.calledWith(Admin.prototype.save);
    sinon.assert.calledWith(res.send, "Admin user has been added!");
  }));

  it('should return error message on save admin error', test(function () {
    this.stub(Admin.prototype, 'save').yields(error);
    Controller.createAdmin(req, res);
    sinon.assert.calledWith(Admin.prototype.save);
    sinon.assert.calledWith(res.send , "There was a error saving admin user.");
  }));
});