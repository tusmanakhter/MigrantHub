var AdminAccountValidator = require('../validators/AdminAccountValidator');
var AccountFactory = require('./factories/AccountFactory');
var chai = require('chai');
var assert = chai.assert;


describe('admin account validator', function () {
    it('returns an empty string on valid admin account', function () {
        let errors = AdminAccountValidator(AccountFactory.validAdminAccount());
        assert.equal("", errors);
    });

    it('returns errors on empty admin account', function () {
        var expectedErrors =
            "{'\n'}Email is required" +
            "{'\n'}Password is empty";
        let errors = AdminAccountValidator(AccountFactory.emptyAdminAccount());
        assert.equal(expectedErrors, errors);
    });
});