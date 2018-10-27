var User = require('../models/MigrantUser');
var BusinessUser = require('../models/BusinessUser');
var Admin = require('../models/Admin');
var BusinessAccountValidator = require('../validators/BusinessAccountValidator');
var MigrantAccountValidator = require('../validators/MigrantAccountValidator');
var AdminAccountValidator = require('../validators/AdminAccountValidator');
var qs = require('qs');
var bcrypt = require('bcryptjs');


module.exports = {
  createUser: function(req, res) {
    let parsedObj = qs.parse(req.body);
    let errors = MigrantAccountValidator(parsedObj);

    if (errors == "") {
      let user = new User();
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(parsedObj.password, salt);

      user._id = parsedObj.email;
      user.email = parsedObj.email;
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
  },

  createBusiness: function(req, res) {
    let parsedObj = qs.parse(req.body);
    let errors = BusinessAccountValidator(parsedObj);

    if (errors == "") {
      let businessuser = new BusinessUser();
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(parsedObj.password, salt);

      businessuser._id = parsedObj.email;
      businessuser.email = parsedObj.email;
      businessuser.password = hash;

      businessuser.corpId = parsedObj.corpId;
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
  },

  createAdmin: function(req, res) {
    let parsedObj = qs.parse(req.body);
    let errors = AdminAccountValidator(parsedObj);

    if (errors == "") {
      let admin = new Admin();
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(parsedObj.password, salt);

      admin._id = parsedObj.email;
      admin.email = parsedObj.email;
      admin.password = hash;

      admin.save(function (err) {
        if (err) {
          res.send("There was a error saving admin user.");
          // Todo: Should create with error
          console.log(err)
        } else {
          res.send('Admin user has been added!');
        }
      });
    } else {
      res.send(errors);
    }
  },

  editUser: function(req, res) {
    let parsedObj = qs.parse(req.body);

    console.log(parsedObj.user);
   
   let errors = MigrantAccountValidator(parsedObj);

    if (errors == "") {
      let user = new User();
      user.firstName = parsedObj.firstName;

      user.updateOne(function (err) {
        if (err) {
          res.send("There was a error update user.");
          // Todo: Should create with error
          console.log(err)
        } else {
          res.send('User has been updated!');
        }
      });
    } else {
      res.send(errors);
    }
  
  },
  getUser: function(req, res) {

    let email = req.session.passport.user._id;

    console.log(email);

    User.findOne({ email: email }, (err, user) => {
      console.log(user);
      if (err) {
          console.log("Error: ");
          res.status(500).send(err)
      } else if (!user) {
          console.log("User does not exist");
          res.status(500).send('Incorrect email');
      }  else {
          console.log("Found user");
          res.status(200).send(user)
      }
  })

   
  },
}; 