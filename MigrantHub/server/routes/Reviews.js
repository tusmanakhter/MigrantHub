const express = require('express');

const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { ensureRole, ensureIsOwner } = require('../middleware/AuthMiddleware');
const Review = require('../models/Review');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/', controllerHandler(ReviewController.getReviews, req => [req.query]));
router.post('/', ensureRole('migrant'), controllerHandler(ReviewController.createReview, req => [req.user, req.body]));
router.delete('/:id', ensureIsOwner(Review, true, false, true), controllerHandler(ReviewController.deleteReview, req => [req.params.id]));

module.exports = router;
