const express = require('express');
const router = express.Router();

// Import Controllers
const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController');

// Static Pages
router.get('/', pageController.getHome);
router.get('/checkout', pageController.getCheckout);
router.get('/brands', pageController.getBrands);
router.get('/blog', pageController.getBlog);
router.get('/contact', pageController.getContact);

// Product Pages (Server-side rendered)
router.get('/for-her', productController.getForHer);
router.get('/for-him', productController.getForHim);

module.exports = router;
