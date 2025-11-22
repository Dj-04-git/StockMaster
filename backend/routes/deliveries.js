const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/deliverycontroller');


router.post('/', DeliveryController.createDelivery);
router.post('/:id/validate', DeliveryController.validateDelivery);


module.exports = router;