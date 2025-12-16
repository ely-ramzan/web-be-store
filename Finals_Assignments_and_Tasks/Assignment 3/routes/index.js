const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController');

router.get('/', pageController.getHome);
router.get('/checkout', pageController.getCheckout);
router.get('/brands', pageController.getBrands);
router.get('/blog', pageController.getBlog);
router.get('/contact', pageController.getContact);
router.get('/for-her', productController.getForHer);
router.get('/for-him', productController.getForHim);

module.exports = router;
