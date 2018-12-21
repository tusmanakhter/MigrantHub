var AdminAccountValidator = require('../../validators/AdminAccountValidator');
var AccountFactory = require('../factories/AccountFactory');
var chai = require('chai');
var assert = chai.assert;


describe('admin account validator', function () {
    it('returns an empty string on valid admin account', async function () {
        let errors = await AdminAccountValidator.adminAccountValidator(AccountFactory.validAdminAccount());
        assert.equal("", errors);
    });

    it('returns errors on empty admin account', async function () {
        var expectedErrors =
            "{'\n'}Email is required" +
            "{'\n'}Password is empty";
        let errors = await AdminAccountValidator.adminAccountValidator(AccountFactory.emptyAdminAccount());
        assert.equal(expectedErrors, errors);
    });
});