module.exports = {
  ensureUser(req, res, next) {
    if (req.user !== undefined) {
      return next();
    }
    return res.status(403).send('You are not authorized for this');
  },

  ensureRole: function ensureRole(type) {
    return function checkUser(req, res, next) {
      if (req.user.type === type) {
        return next();
      }
      return res.status(403).send('You are not authorized for this');
    };
  },

  ensureOwner(req, res, next) {
    if (req.user._id === req.params.id) {
      return next();
    }
    return res.status(403).send('You are not authorized for this');
  },
};
