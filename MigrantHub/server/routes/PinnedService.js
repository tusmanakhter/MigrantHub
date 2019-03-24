const express = require('express');

const router = express.Router();
const PinnedServiceController = require('../controllers/PinnedServiceController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/', controllerHandler(PinnedServiceController.getPinnedServices, req => [req.user._id, req.query.offset, req.query.limit]));
router.put('/:id', controllerHandler(PinnedServiceController.updatePinnedService, req => [req.user._id, req.params.id]));
router.delete('/:id', controllerHandler(PinnedServiceController.deletePinnedService, req => [req.user._id, req.params.id]));

module.exports = router;