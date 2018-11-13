const express = require('express');
const { ensureOwner } = require('../middleware/authMiddleware');
const businessController = require('../controllers/businessController');

const router = express.Router();

router.get('/:id', ensureOwner, businessController.getBusinessUser);
router.put('/:id', ensureOwner, businessController.editBusinessUser);

module.exports = router;
