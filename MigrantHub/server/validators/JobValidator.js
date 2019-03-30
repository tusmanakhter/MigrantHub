const { check } = require('express-validator/check');

module.exports = {
  validateJob: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('title is required.'),

    check('positionType')
      .not()
      .isEmpty()
      .withMessage('position type is required.'),

    check('contactName')
      .not()
      .isEmpty()
      .withMessage('contact name is required.'),

    check('location')
      .not()
      .isEmpty()
      .withMessage('Location information is required'),

    check('salaryStart')
      .optional({ checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('salary start date is required'),

    check('salaryEnd')
      .optional({ checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('salary end is required'),

    check('website')
      .optional({ checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('website is required'),
  ],
};
