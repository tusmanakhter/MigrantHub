var express = require('express');
var router = express.Router();
var User = require('../models/User');
var BusinessUser = require('../models/BusinessUser');
var qs = require('qs');

router.get('/', function(req, res){
    res.render('index')
});
router.route('/insertProfile')
    .post(function(req,res) {

        let parsedObj = qs.parse(req.body);
        console.log(parsedObj);
        console.log(parsedObj.email);

        let user = new User();
        user._id = parsedObj.email;
        user.email = parsedObj.email;
        user.password = parsedObj.password;
        user.confirmPassword = parsedObj.confirmPassword;
        user.firstName = parsedObj.firstName;
        user.lastName = parsedObj.lastName;
        user.address = parsedObj.address;
        user.apartment = parsedObj.apartment;
        user.city = parsedObj.city;
        user.province = parsedObj.province;
        user.postalCode = parsedObj.postalCode;
        user.phoneNumber = parsedObj.phoneNumber;
        user.age = parsedObj.age;
        user.gender = parsedObj.gender;
        user.nationality = parsedObj.nationality;
        user.relationshipStatus = parsedObj.relationshipStatus;
        user.status = parsedObj.status;
        user.languages = parsedObj.languages;
        user.writingLevel = parsedObj.writingLevel;
        user.speakingLevel = parsedObj.speakingLevel;
        user.motherTongue = parsedObj.motherTongue;
        user.family = parsedObj.family;
        user.educationLevel = parsedObj.educationLevel;
        user.proficiencyExams = parsedObj.proficiencyExams;
        user.jobStatus = parsedObj.jobStatus;
        user.lookingForJob = parsedObj.lookingForJob;
        user.currentIncome = parsedObj.currentIncome;
        user.workExperience = parsedObj.workExperience;
        user.settlingLocation = parsedObj.settlingLocation;
        user.settlingDuration = parsedObj.settlingDuration;
        user.joiningReason = parsedObj.joiningReason;
        user.save(function(err) {
            if (err){
                res.send(err);
                console.log(err)
            }else{
                res.send('User has been added!');
            }
        });
    });

router.route('/insertBusinessProfile')
    .post(function(req,res) {
        let parsedObj = qs.parse(req.body);
        let BusinessUser = new BusinessUser();
        BusinessUser._id = parsedObj.email;
        BusinessUser.email = parsedObj.email;
        BusinessUser.corpId = parsedObj.corpId;
        BusinessUser.password = parsedObj.password;
        BusinessUser.confirmPassword = parsedObj.confirmPassword;
        BusinessUser.firstName = parsedObj.firstName;
        BusinessUser.lastName = parsedObj.lastName;
        BusinessUser.address = parsedObj.address;
        BusinessUser.apartment = parsedObj.apartment;
        BusinessUser.city = parsedObj.city;
        BusinessUser.province = parsedObj.province;
        BusinessUser.postalCode = parsedObj.postalCode;
        BusinessUser.phoneNumber = parsedObj.phoneNumber;
        BusinessUser.nameOrganization = parsedObj.nameOrganization;
        BusinessUser.typeOrganization = parsedObj.typeOrganization;
        BusinessUser.nameDepartment = parsedObj.nameDepartment;
        BusinessUser.typeService = parsedObj.typeService;
        BusinessUser.description = parsedObj.description;
        BusinessUser.save(function(err) {
            if (err){
                res.send(err);
                console.log(err)
            }else{
                res.send('Business user has been added!');
            }
        });
    });
    
module.exports = router;