var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcryptjs');
var strategy = new LocalStrategy(

    function(username, password, done) {
        User.findOne({ email: username }, (err, user) => {
            console.log("");
            if (err) {
                console.log("Error: ");
                return done(err)
            }
            if (!user) {
                console.log("Incorrect email");
                return done(null, false, { message: 'Incorrect email' })
            }
            if (!(password==user.password)) {
                console.log("Incorrect password");
                return done(null, false, { message: 'Incorrect password' })
            }
            console.log("Correct password");
            return done(null, user)
        })
    }
)
module.exports = strategy 