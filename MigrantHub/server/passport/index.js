var passport = require('passport')
var LocalStrategy = require('./localStrategy')
var User = require('../models/User');

passport.serializeUser((user, done) => {
    console.log('Serialize User called')
    console.log('---------')
    done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
    console.log('Deserialize User called')
    User.findOne(
        { _id: id },
        'username',
        (err, user) => {
            console.log('--------------')
            done(null, user)
        }
    )
})

passport.use(LocalStrategy)
module.exports = passport 