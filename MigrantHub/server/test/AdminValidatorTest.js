var AdminAccountValidator = require('../validators/AdminAccountValidator');
var chai = require('chai');
var assert = chai.assert;

const validAdminAccount = {
    email : "test@hotmail.com",
    password : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    confirmPassword : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2"
};

const emptyAdminAccount = {
    email : "",
    password : "",
    confirmPassword : ""
};


describe('AdminAccountValidator()', function () {
    it('returns an empty string on valid admin account', function () {
        let errors = AdminAccountValidator(validAdminAccount);
        assert.equal("", errors);
    });
});

describe('AdminAccountValidator()', function () {
    it('returns errors on empty admin account', function () {
        var expectedErrors =
            "{'\n'}Email is required" +
            "{'\n'}Password is empty";
        let errors = AdminAccountValidator(emptyAdminAccount);
        assert.equal(expectedErrors, errors);
    });
});
