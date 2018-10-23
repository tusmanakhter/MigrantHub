var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcryptjs');
var strategy = new LocalStrategy(

    function(username, password, done) {
        User.findOne({ email: username }, (err, user) => {
            if (err) {
                console.log("Error: ");
                return done(err)
            } else if (!user) {
                console.log("Incorrect email");
                return done(null, false, { message: 'Incorrect email' })
            } else if (!bcrypt.compareSync(password, user.password)) {
                console.log("Incorrect password");
                return done(null, false, { message: 'Incorrect password' })
            } else {
                console.log("Correct password");
                if (user.type === "admin" && user.authorized === false) {
                    return done(null, false, { message: 'Your admin account is not authorized yet' })
                }
                return done(null, user)
            }
        })
    }
)

module.exports = strategy 