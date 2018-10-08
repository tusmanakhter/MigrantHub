var express = require('express');
var router = express.Router();
var User = require('../models/User');
var qs = require('qs');

var User = require('../models/user');

// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});

// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/users/login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


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

module.exports = router;