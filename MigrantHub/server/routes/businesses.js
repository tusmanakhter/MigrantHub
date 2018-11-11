const express = require('express');

const router = express.Router();
const businessController = require('../controllers/businessController');
const accountController = require('../controllers/accountController');

router.get('/:id', accountController.ensureOwner, businessController.getBusinessUser);
router.put('/:id', accountController.ensureOwner, businessController.editBusinessUser);

module.exports = router;
