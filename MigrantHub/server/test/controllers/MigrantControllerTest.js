var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var MigrantController = require('../../controllers/MigrantController');
var MigrantService = require('../../service/MigrantService');
var AccountFactory = require('../factories/AccountFactory');


describe('migrant controller', function () {
  let req = {
    body: AccountFactory.validMigrantAccount(),
    user:{
      _id: "test@test.com"
    },
  };

  it('should call getMigrantUser migrant service with correct parameters.', test(async function () {
      this.stub(MigrantService, 'getMigrantUser');
      MigrantController.getMigrantUser(req.user._id);
      assert.calledWith(await MigrantService.getMigrantUser, req.user._id);
  }));

  it('should call editMigrantUser migrant service with correct parameters.', test(async function () {
      this.stub(MigrantService, 'editMigrantUser');
      MigrantController.editMigrantUser(req.user._id, req.body);
      assert.calledWith(await MigrantService.editMigrantUser, req.user._id, req.body);
  }));
});