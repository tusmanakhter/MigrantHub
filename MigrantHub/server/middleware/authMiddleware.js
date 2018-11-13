module.exports = {
  ensureUser(req, res, next) {
    if (req.session.passport !== undefined) {
      if (req.session.passport.user !== undefined) {
        return next();
      }
    }
    return res.status(403).send('You are not authorized for this');
  },

  ensureRole: function ensureRole(type) {
    return function checkUser(req, res, next) {
      if (req.session.passport.user.type === type) {
        return next();
      }
      return res.status(403).send('You are not authorized for this');
    };
  },

  ensureOwner(req, res, next) {
    if (req.session.passport.user._id === req.params.id) {
      return next();
    }
    return res.status(403).send('You are not authorized for this');
  },
};
