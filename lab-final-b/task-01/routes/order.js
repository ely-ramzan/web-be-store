const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/cart', orderController.getCart);
router.post('/cart/add', orderController.addToCart);
router.post('/cart/remove/:productId', orderController.removeFromCart);
router.post('/cart/update/:productId', orderController.updateCartQuantity);

router.get('/order/preview', orderController.getOrderPreview);
router.post('/order/confirm', orderController.confirmOrder);
router.get('/order/success/:orderId', orderController.getOrderSuccess);

module.exports = router;
