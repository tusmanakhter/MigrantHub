var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/User');
router.get('/', function(req, res){
    res.render('index')
});
router.route('/insertProfile')
    .post(function(req,res) {
        var user = new User();
        user._id = req.body.email;
        user.email = req.body.email;
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.address = req.address;
        user.apartment = req.body.apartment;
        user.city = req.body.city;
        user.province = req.body.province;
        user.postalCode = req.body.postalCode;
        user.phoneNumber = req.body.phoneNumber;
        user.age = req.body.age;
        user.gender = req.body.gender;
        user.nationality = req.body.nationality;
        user.relationshipStatus = req.body.relationshipStatus;
        user.status = req.body.status;
        user.writingLevel = req.body.writingLevel;
        user.speakingLevel = req.body.speakingLevel;
        user.motherTongue = req.body.motherTongue;
        user.educationLevel = req.body.educationLevel;
        user.proficiencyExams = req.body.proficiencyExams;
        user.jobStatus = req.body.jobStatus;
        user.lookingForJob = req.body.lookingForJob;
        user.currentIncome = req.body.currentIncome;
        user.settlingLocation = req.body.settlingLocation;
        user.settlingDuration = req.body.settlingDuration;
        user.joiningReason = req.body.joiningReason;
        user.save(function(err) {
            if (err)
                res.send(err);
            res.send('User has been added!');
        });
    });

router.route('/insertProfileLanguages')
    .post(function(req,res) {
        var language = {name: req.body.name, writingLevel: req.body.writingLevel, speakingLevel: req.body.speakingLevel};

        User.findOneAndUpdate({_id: req.body.email}, {$push: {languages: language}}, function(err, result) {
            if (err)
                res.send(err);
            res.send('Languages has been added!');
        });
    });

router.route('/insertProfileFamily')
    .post(function(req,res) {
        var family = {age: req.body.age, gender: req.body.gender, relationshipStatus: req.body.relationshipStatus, relation: req.body.relation};

        User.findOneAndUpdate({_id: req.body.email}, {$push: {family: family}}, function(err, result) {
            if (err)
                res.send(err);
            res.send('Family has been added!');
        });
    });

router.route('/insertProfileWork')
    .post(function(req,res) {
        var work = {title: req.body.title, company: req.body.company, years: req.body.years};

        User.findOneAndUpdate({_id: req.body.email}, {$push: {workExperience: work}}, function(err, result) {
            if (err)
                res.send(err);
            res.send('Work has been added!');
        });
    });

module.exports = router;