var MigrantAccountValidator = require('../../validators/MigrantAccountValidator');
var AccountFactory = require('../factories/AccountFactory');
var chai = require('chai');
var assert = chai.assert;


describe('MigrantAccountValidator()', function () {
    it('Validates migrant profile data should return empty error string.', async function () {
        let errors = await MigrantAccountValidator.migrantAccountValidator(AccountFactory.validMigrantAccount());
        assert.equal(errors, ""); 
    });

    it('Invalid migrant profile data should return a string with all the errors', async function () {

        var expectedErrors =
            "\nEmail is required" +
            "\nPassword is empty" +
            "\nFirst name is required and empty" +
            "\nLast name is required and empty" +
            "\nAddress is required and empty" +
            "\nCity is required and empty" +
            "\nProvince is required and empty" +
            "\nPostal code is required and empty" +
            "\nPhone number is required and empty" +
            "\nAge is required and empty" +
            "\nGender is required and empty" +
            "\nNationality is required and empty" +
            "\nRelationship status is required and empty" +
            "\nStatus is required and empty" +
            "\nMother tongue is required and empty" +
            "\nWriting level is required and empty" +
            "\nSpeaking level is required and empty" +
            "\nLanguage name is required and empty" +
            "\nAdditional language writing level is required and empty" +
            "\nAdditional language speaking level is required and empty" +
            "\nFamily member age is required and empty" +
            "\nFamily member gender is required and empty" +
            "\nFamily member relationship status is required and empty" +
            "\nFamily member relation is required and empty" +
            "\nFamily member age is required and empty" +
            "\nFamily member gender is required and empty" +
            "\nFamily member relationship status is required and empty" +
            "\nFamily member relation is required and empty" +
            "\nFamily member age is required and empty" +
            "\nFamily member gender is required and empty" +
            "\nFamily member relationship status is required and empty" +
            "\nFamily member relation is required and empty" +
            "\nEducation level is required and empty" +
            "\nJob status is required and empty" +
            "\nThe looking for a job field is required and empty" +
            "\nThe french proficiency exam value seems to be invalid." +
            "\nThe IELTS proficiency exam value seems to be invalid." +
            "\nThe job status field is required and empty" +
            "\nWork experience title is required and empty" +
            "\nCompany is required and empty" +
            "\nEmployment length is required and empty" +
            "\nSettling location is required and empty" +
            "\nSettling duration is required and empty" +
            "\nJoining reason is required and empty";

        let forcedErrors = await MigrantAccountValidator.migrantAccountValidator(AccountFactory.emptyMigrantAccount());
        assert.equal(forcedErrors, expectedErrors);
    });

    it('Invalid migrant profile data should return a string with all the errors', async function () {

        var expectedErrors =
            "\nAge should be a valid number greater than 0." +
            "\nFamily member's age should be a valid number greater than 0." +
            "\nFamily member's age should be a valid number greater than 0." +
            "\nFamily member's age should be a valid number greater than 0." +
            "\nEmployment length is not valid"

        let forcedErrors = await MigrantAccountValidator.migrantAccountValidator(AccountFactory.invalidNumbersMigrantAccount());
        assert.equal(forcedErrors, expectedErrors);
    });
});