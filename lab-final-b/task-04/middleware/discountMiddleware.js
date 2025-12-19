// Discount Middleware - Applies coupon-based discounts
const COUPON_CODES = {
    'SAVE10': { type: 'percentage', value: 10, description: '10% off your order' }
};

const applyDiscount = (req, res, next) => {
    try {
        const cart = (req.session && req.session.cart) ? req.session.cart : [];
        const originalTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        let couponCode = '';
        if (req.query && req.query.coupon) couponCode = req.query.coupon;
        else if (req.body && req.body.coupon) couponCode = req.body.coupon;
        else if (req.session && req.session.appliedCoupon) couponCode = req.session.appliedCoupon;

        couponCode = (couponCode || '').toUpperCase().trim();

        if ((req.query && req.query.coupon) || (req.body && req.body.coupon)) {
            if (req.session) req.session.appliedCoupon = couponCode;
        }

        let discountInfo = {
            applied: false, couponCode: '', discountType: '', discountValue: 0,
            discountAmount: 0, originalTotal: originalTotal, finalTotal: originalTotal, description: ''
        };

        if (couponCode && COUPON_CODES[couponCode]) {
            const coupon = COUPON_CODES[couponCode];
            if (coupon.type === 'percentage') {
                discountInfo.discountAmount = (originalTotal * coupon.value) / 100;
            } else if (coupon.type === 'fixed') {
                discountInfo.discountAmount = Math.min(coupon.value, originalTotal);
            }
            discountInfo.applied = true;
            discountInfo.couponCode = couponCode;
            discountInfo.discountType = coupon.type;
            discountInfo.discountValue = coupon.value;
            discountInfo.finalTotal = originalTotal - discountInfo.discountAmount;
            discountInfo.description = coupon.description;
        }

        req.discountInfo = discountInfo;
        next();
    } catch (error) {
        console.error('Discount middleware error:', error);
        req.discountInfo = { applied: false, discountAmount: 0, originalTotal: 0, finalTotal: 0 };
        next();
    }
};

const removeCoupon = (req, res, next) => {
    try {
        if (req.session && req.session.appliedCoupon) delete req.session.appliedCoupon;
        req.discountInfo = null;
        next();
    } catch (error) {
        next();
    }
};

const validateCoupon = (req, res) => {
    const couponCode = ((req.body && req.body.coupon) || (req.query && req.query.coupon) || '').toUpperCase().trim();
    if (!couponCode) return res.json({ valid: false, message: 'Please enter a coupon code' });
    if (COUPON_CODES[couponCode]) {
        const coupon = COUPON_CODES[couponCode];
        return res.json({ valid: true, couponCode, discountType: coupon.type, discountValue: coupon.value, description: coupon.description, message: `Coupon applied: ${coupon.description}` });
    }
    return res.json({ valid: false, message: 'Invalid coupon code' });
};

module.exports = { applyDiscount, removeCoupon, validateCoupon, COUPON_CODES };
