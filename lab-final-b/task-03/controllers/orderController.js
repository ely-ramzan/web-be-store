const Order = require('../models/OrderSchema');
const Product = require('../models/ProductSchema');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        if (!req.session.cart) req.session.cart = [];

        const existingIndex = req.session.cart.findIndex(item => item.productId === productId);
        if (existingIndex > -1) {
            req.session.cart[existingIndex].quantity += parseInt(quantity);
        } else {
            req.session.cart.push({
                productId: product._id.toString(),
                name: product.name,
                price: product.price,
                quantity: parseInt(quantity),
                image: product.image
            });
        }

        res.json({
            success: true,
            message: 'Product added to cart',
            cartCount: req.session.cart.reduce((sum, item) => sum + item.quantity, 0)
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.render('cart', { title: 'Shopping Cart - BeStore', currentPage: 'cart', cart, grandTotal, appliedCoupon: req.session.appliedCoupon || '' });
};

exports.removeFromCart = (req, res) => {
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.productId !== req.params.productId);
    }
    res.redirect('/cart');
};

exports.updateCartQuantity = (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (req.session.cart) {
        const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            if (parseInt(quantity) <= 0) req.session.cart.splice(itemIndex, 1);
            else req.session.cart[itemIndex].quantity = parseInt(quantity);
        }
    }
    res.redirect('/cart');
};

exports.applyCoupon = (req, res) => {
    res.redirect(req.body.redirectTo || '/cart');
};

exports.removeCoupon = (req, res) => {
    res.redirect(req.body.redirectTo || '/cart');
};

exports.getOrderPreview = (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) return res.redirect('/cart');

    const discountInfo = req.discountInfo || {
        applied: false,
        originalTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        finalTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discountAmount: 0
    };

    res.render('order-preview', {
        title: 'Order Preview - BeStore',
        currentPage: 'order-preview',
        cart,
        grandTotal: discountInfo.originalTotal,
        discountInfo
    });
};

exports.confirmOrder = async (req, res) => {
    try {
        const cart = req.session.cart || [];
        if (cart.length === 0) return res.redirect('/cart');

        const customerEmail = req.body.email || '';
        const discountInfo = req.discountInfo || {
            applied: false,
            originalTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            finalTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            discountAmount: 0,
            couponCode: ''
        };

        const order = new Order({
            items: cart.map(item => ({
                productId: item.productId, name: item.name, price: item.price, quantity: item.quantity, image: item.image
            })),
            subtotal: discountInfo.originalTotal,
            discountApplied: discountInfo.applied,
            couponCode: discountInfo.couponCode || '',
            discountAmount: discountInfo.discountAmount,
            grandTotal: discountInfo.finalTotal,
            status: 'Placed',
            customerInfo: { email: customerEmail }
        });

        await order.save();
        req.session.cart = [];
        delete req.session.appliedCoupon;
        res.redirect(`/order/success/${order._id}`);
    } catch (error) {
        console.error('Order confirmation error:', error);
        res.status(500).render('error', { title: 'Error - BeStore', currentPage: 'error', message: 'Failed to place order.' });
    }
};

exports.getOrderSuccess = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).render('error', { title: 'Order Not Found', currentPage: 'error', message: 'Order not found.' });
        res.render('order-success', { title: 'Order Placed - BeStore', currentPage: 'order-success', order });
    } catch (error) {
        console.error('Order success page error:', error);
        res.status(500).render('error', { title: 'Error - BeStore', currentPage: 'error', message: 'Failed to load order.' });
    }
};

// Task 3: Customer Order History
exports.getMyOrdersPage = (req, res) => {
    res.render('my-orders', { title: 'My Orders - BeStore', currentPage: 'my-orders', orders: null, searchedEmail: '', error: null });
};

exports.getMyOrders = async (req, res) => {
    try {
        const email = (req.body.email || '').trim().toLowerCase();
        if (!email) {
            return res.render('my-orders', { title: 'My Orders - BeStore', currentPage: 'my-orders', orders: null, searchedEmail: '', error: 'Please enter your email address' });
        }
        const orders = await Order.find({ 'customerInfo.email': { $regex: new RegExp(`^${email}$`, 'i') } }).sort({ createdAt: -1 });
        res.render('my-orders', { title: 'My Orders - BeStore', currentPage: 'my-orders', orders, searchedEmail: email, error: orders.length === 0 ? 'No orders found for this email' : null });
    } catch (error) {
        console.error('My orders error:', error);
        res.render('my-orders', { title: 'My Orders - BeStore', currentPage: 'my-orders', orders: null, searchedEmail: '', error: 'Error fetching orders' });
    }
};
