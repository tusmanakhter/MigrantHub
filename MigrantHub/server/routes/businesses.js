const express = require('express');

const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/:id', businessController.getBusinessUser);
router.put('/:id', businessController.editBusinessUser);

module.exports = router;
