const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productcontroller');

router.post('/', ProductController.createProduct);
router.get('/', ProductController.listProducts);

module.exports = router;
