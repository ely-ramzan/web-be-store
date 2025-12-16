const express = require('express');
const router = express.Router();

// Import Controller
const productController = require('../controllers/productController');

// API Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
