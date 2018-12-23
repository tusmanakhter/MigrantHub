const express = require('express');

const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { ensureRole, ensureIsOwner } = require('../middleware/AuthMiddleware');
const Review = require('../models/Review');

router.get('/', ReviewController.getReviews);
router.post('/', ensureRole('migrant'), ReviewController.createReview);
router.delete('/:id', ensureIsOwner(Review, true, false, true), ReviewController.deleteReview);

module.exports = router;
