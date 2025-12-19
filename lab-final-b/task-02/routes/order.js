const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { applyDiscount, validateCoupon, removeCoupon } = require('../middleware/discountMiddleware');

router.get('/cart', orderController.getCart);
router.post('/cart/add', orderController.addToCart);
router.post('/cart/remove/:productId', orderController.removeFromCart);
router.post('/cart/update/:productId', orderController.updateCartQuantity);

router.post('/coupon/apply', applyDiscount, orderController.applyCoupon);
router.post('/coupon/remove', removeCoupon, orderController.removeCoupon);
router.post('/coupon/validate', validateCoupon);

router.get('/order/preview', applyDiscount, orderController.getOrderPreview);
router.post('/order/confirm', applyDiscount, orderController.confirmOrder);
router.get('/order/success/:orderId', orderController.getOrderSuccess);

module.exports = router;
