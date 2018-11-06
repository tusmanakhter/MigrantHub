var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/accountController')
var Admin = require('../../models/Admin')
var MigrantUser = require('../../models/MigrantUser')
var BusinessUser = require('../../models/BusinessUser')
var AccountFactory = require('../factories/AccountFactory');

describe('account controller migrant', function () {
  let req = {
    body: AccountFactory.validMigrantAccount()
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
    body: AccountFactory.validBusinessAccount()
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
    body: AccountFactory.validAdminAccount()
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

  describe('account controller get migrant', function () {
    let req = {
      body: AccountFactory.validMigrantAccount(),
    session: {
      passport:{
        user:{
          _id: "test@test.com"
        }
      }
    }
    },
    error = new Error({ error: "err" }),
    res = {}, expectedResult;
    
      beforeEach(function () {
          status = sinon.stub();
          send = sinon.spy();
          res = { send, status };
          status.returns(res);
      });
    
      it('account controller get migrant profile', test(function () {
      this.stub(MigrantUser, 'findOne')
      Controller.getMigrantUser(req, res);
      sinon.assert.calledWith(MigrantUser.findOne, {email: "test@test.com"});
    })); 
});

describe('account controller get business', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
  session: {
    passport:{
      user:{
        _id: "test@test.com"
      }
    }
  }
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;
  
    beforeEach(function () {
        status = sinon.stub();
        send = sinon.spy();
        res = { send, status };
        status.returns(res);
    });
  
    it('account controller get business profile', test(function () {
    this.stub(BusinessUser, 'findOne')
    Controller.getBusinessUser(req, res);
    sinon.assert.calledWith(BusinessUser.findOne, {email: "test@test.com"});
  })); 
});

describe('account controller edit migrant', function () {
  let req = {
    body: AccountFactory.validMigrantAccount(),
  session: {
    passport:{
      user:{
        _id: "test@test.com"
      }
    }
  }
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;
  
    beforeEach(function () {
        status = sinon.stub();
        send = sinon.spy();
        res = { send, status };
        status.returns(res);
    });
  
    it('account controller edit migrant profile', test(function () {
      expectedResult = req.body
      this.stub(MigrantUser, 'findByIdAndUpdate').yields(null, expectedResult);
      Controller.editMigrantUser(req, res);
      sinon.assert.calledWith(res.send, "Updated Migrant User");
  })); 
});

describe('account controller edit business', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
  session: {
    passport:{
      user:{
        _id: "test@test.com"
      }
    }
  }
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;
  
    beforeEach(function () {
        status = sinon.stub();
        send = sinon.spy();
        res = { send, status };
        status.returns(res);
    });
  
    it('account controller edit business profile', test(function () {
      expectedResult = req.body
      this.stub(BusinessUser, 'findByIdAndUpdate').yields(null, expectedResult);    Controller.editBusinessUser(req, res);
      sinon.assert.calledWith(res.send, "Updated Business User");
  })); 
});