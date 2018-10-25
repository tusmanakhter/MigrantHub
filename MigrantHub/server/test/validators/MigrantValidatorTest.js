var MigrantAccountValidator = require('../../validators/MigrantAccountValidator');
var chai = require('chai');
var assert = chai.assert;

const validMerchantProfileData = {
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
    email : "lax@hotmail.com",
    password : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    confirmPassword : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    firstName : "Lax",
    lastName : "Test",
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
};

const emptyMerchantProfileData = {
    proficiencyExams : {
        ielts : "",
        french : "",
        others : ""
    },
    languages : [
        {
            name : "",
            writingLevel : "",
            speakingLevel : ""
        }
    ],
    family : [
        {
            age : "",
            gender : "",
            relation : "",
            relationshipStatus : ""
        },
        {
            age : "",
            gender : "",
            relation : "",
            relationshipStatus : ""
        },
        {
            age : "",
            gender : "",
            relation : "",
            relationshipStatus : ""
        }
    ],
    workExperience : [
        {
            title : "",
            company : "",
            years : ""
        }
    ],
    email : "",
    password : "",
    confirmPassword : "",
    firstName : "",
    lastName : "",
    address : "",
    apartment : "",
    city : "",
    province : "",
    postalCode : "",
    phoneNumber : "",
    age : "",
    gender : "",
    nationality : "",
    relationshipStatus : "",
    status : "",
    writingLevel : "",
    speakingLevel : "",
    motherTongue : "",
    educationLevel : "",
    jobStatus : "",
    lookingForJob : "",
    currentIncome : "",
    settlingLocation : "",
    settlingDuration : "",
    joiningReason : ""
};

const invalidNumbersMerchantProfileData = {
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
            age : "-14",
            gender : "male",
            relation : "brother",
            relationshipStatus : "single"
        },
        {
            age : "-8",
            gender : "female",
            relation : "mother",
            relationshipStatus : "married"
        },
        {
            age : "-51",
            gender : "male",
            relation : "father",
            relationshipStatus : "married"
        }
    ],
    workExperience : [
        {
            title : "Admin",
            company : "Concordia",
            years : "years"
        }
    ],
    email : "lax@hotmail.com",
    password : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    confirmPassword : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    firstName : "Lax",
    lastName : "Test",
    address : "1455 Boulevard de Maisonneuve O",
    apartment : "",
    city : "Montreal",
    province : "QC",
    postalCode : "H3G 1M8",
    phoneNumber : "(514) 848-2424",
    age : "-1",
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
    currentIncome : "-15000",
    settlingLocation : "LAVAL, QC",
    settlingDuration : "invalid",
    joiningReason : "help"
};

describe('MigrantAccountValidator()', function () {
    it('Validates migrant profile data should return empty error string.', function () {

        console.log("Error free profile data")
        let errors = MigrantAccountValidator(validMerchantProfileData);
        assert.equal(errors, "");
    });
});

describe('MigrantAccountValidator()', function () {
    it('Invalid migrant profile data should return a string with all the errors', function () {

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

        console.log("Error profile data, caused by empty fields")
        let forcedErrors = MigrantAccountValidator(emptyMerchantProfileData);
        assert.equal(forcedErrors, expectedErrors);
    });
});

    describe('MigrantAccountValidator()', function () {
        it('Invalid migrant profile data should return a string with all the errors', function () {

            var expectedErrors =
                "\nAge should be a valid number greater than 0." +
                "\nFamily member's age should be a valid number greater than 0." +
                "\nFamily member's age should be a valid number greater than 0." +
                "\nFamily member's age should be a valid number greater than 0." +
                "\nEmployment length is not valid"

            console.log("Error profile data, caused by empty fields");
            let forcedErrors = MigrantAccountValidator(invalidNumbersMerchantProfileData);
            console.log(forcedErrors);
            assert.equal(forcedErrors, expectedErrors);
        });
});