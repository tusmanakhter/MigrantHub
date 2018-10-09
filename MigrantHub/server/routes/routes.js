var express = require('express');
var router = express.Router();
var User = require('../models/User');
var BusinessUser = require('../models/BusinessUser');
var MigrantProfileValidator = require('../MigrantProfileValidator');
var qs = require('qs');
var bcrypt = require('bcryptjs');

router.get('/', function (req, res) {
  res.render('index')
});
router.route('/insertProfile')
  .post(function (req, res) {

    let parsedObj = qs.parse(req.body);
    let errors = MigrantProfileValidator(parsedObj);

    if (errors == "") {
      let user = new User();
      user._id = parsedObj.email;
      user.email = parsedObj.email;
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(parsedObj.password, salt);
      user.password = hash;
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
      user.save(function (err) {
        if (err) {
          res.send("There was a error saving user.");
          // Todo: Should create with error
          console.log(err)
        } else {
          res.send('User has been added!');
        }
      });
    } else {
      res.send(errors);
    }
  });

router.route('/insertBusinessProfile')
  .post(function (req, res) {

    let parsedObj = qs.parse(req.body);
    let errors = BusinessProfileValidator(parsedObj);

    if (errors == "") {
      let businessuser = new BusinessUser();
      businessuser._id = parsedObj.email;
      businessuser.email = parsedObj.email;

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(parsedObj.password, salt);
      businessuser.password = hash;
      businessuser.confirmPassword = hash;


      businessuser._id = parsedObj.email;
      businessuser.email = parsedObj.email;
      businessuser.corpId = parsedObj.corpId;
      businessuser.password = parsedObj.password;
      businessuser.confirmPassword = parsedObj.confirmPassword;
      businessuser.firstName = parsedObj.firstName;
      businessuser.lastName = parsedObj.lastName;
      businessuser.address = parsedObj.address;
      businessuser.apartment = parsedObj.apartment;
      businessuser.city = parsedObj.city;
      businessuser.province = parsedObj.province;
      businessuser.postalCode = parsedObj.postalCode;
      businessuser.phoneNumber = parsedObj.phoneNumber;
      businessuser.organizationName = parsedObj.organizationName;
      businessuser.orgType = parsedObj.orgType;
      businessuser.department = parsedObj.department;
      businessuser.serviceType = parsedObj.serviceType;
      businessuser.description = parsedObj.description;
      businessuser.save(function (err) {
        if (err) {
          res.send("There was a error saving business user.");
          // Todo: Should create with error
          console.log(err)
        } else {
          res.send('Business user has been added!');
        }
      });
    } else {
      res.send(errors);
    }
  });

module.exports = router;