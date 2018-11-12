const { check } = require('express-validator/check');

module.exports.validateBusiness = [
  check('email')
    .isEmail()
    .withMessage('Email is required.')
    .not()
    .isEmpty()
    .withMessage('Email is not valid.'),

  check('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters.'),
];
