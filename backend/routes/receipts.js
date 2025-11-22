const express = require('express');
const router = express.Router();
const ReceiptController = require('../controllers/receiptcontroller'); // FIXED CASE

router.post('/', ReceiptController.createReceipt);
router.post('/:id/validate', ReceiptController.validateReceipt);

module.exports = router;
