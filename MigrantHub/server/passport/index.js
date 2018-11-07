var passport = require('passport')
var LocalStrategy = require('./localStrategy')
var User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, { _id: user._id, type: user.type })
})

passport.deserializeUser((user, done) => {
    User.findOne(
        { _id: user._id },
        { type: true },
        (err, user) => {
            done(null, user)
        }
    )
})

passport.use(LocalStrategy)
module.exports = passport 