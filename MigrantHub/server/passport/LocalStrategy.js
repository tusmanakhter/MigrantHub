var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcryptjs');
var strategy = new LocalStrategy(

    function(username, password, done) {
        User.findOne({ email: username, deleted: false }, (err, user) => {
            if (err) {
                return done(err)
            } else if (!user) {
                return done(null, false, { message: 'Incorrect email' })
            } else if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect password' })
            } else {
                if (user.type === "admin" && user.authorized === false) {
                    return done(null, false, { message: 'Your admin account is not authorized yet' })
                }
                return done(null, user)
            }
        })
    }
)

module.exports = strategy 