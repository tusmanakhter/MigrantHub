const express = require('express');
const { ensureOwner } = require('../middleware/AuthMiddleware');
const BusinessController = require('../controllers/BusinessController');

const router = express.Router();

router.get('/:id', ensureOwner, BusinessController.getBusinessUser);
router.put('/:id', ensureOwner, BusinessController.editBusinessUser);

module.exports = router;
