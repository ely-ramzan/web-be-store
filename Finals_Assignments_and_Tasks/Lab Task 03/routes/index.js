const express = require('express');
const router = express.Router();

// Import Controller
const pageController = require('../controllers/pageController');

// All Routes - Delegated to Controller
router.get('/', pageController.getHome);
router.get('/checkout', pageController.getCheckout);
router.get('/for-her', pageController.getForHer);
router.get('/for-him', pageController.getForHim);
router.get('/brands', pageController.getBrands);
router.get('/blog', pageController.getBlog);
router.get('/contact', pageController.getContact);

module.exports = router;
