const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getHome);
router.get('/checkout', pageController.getCheckout);
router.get('/for-her', pageController.getForHer);
router.get('/for-him', pageController.getForHim);
router.get('/brands', pageController.getBrands);
router.get('/blog', pageController.getBlog);
router.get('/contact', pageController.getContact);

module.exports = router;
