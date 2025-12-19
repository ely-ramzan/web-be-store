const Product = require('../models/ProductSchema');
const Order = require('../models/OrderSchema');

exports.getDashboard = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const forHimCount = await Product.countDocuments({ category: 'for-him' });
        const forHerCount = await Product.countDocuments({ category: 'for-her' });
        const clothingCount = await Product.countDocuments({ productType: 'clothing' });
        const shoesCount = await Product.countDocuments({ productType: 'shoes' });
        const accessoriesCount = await Product.countDocuments({ productType: 'accessories' });
        const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
        const totalOrders = await Order.countDocuments();
        const placedOrders = await Order.countDocuments({ status: 'Placed' });
        const processingOrders = await Order.countDocuments({ status: 'Processing' });
        const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });

        res.render('admin/dashboard', {
            title: 'Dashboard', pageTitle: 'Dashboard', currentPage: 'dashboard',
            stats: { totalProducts, forHimCount, forHerCount, clothingCount, shoesCount, accessoriesCount, totalOrders, placedOrders, processingOrders, deliveredOrders },
            recentProducts
        });
    } catch (error) {
        res.render('admin/dashboard', { title: 'Dashboard', currentPage: 'dashboard', stats: {}, recentProducts: [], error: 'Error loading dashboard' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const filter = {};
        if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };
        if (req.query.category) filter.category = req.query.category;
        if (req.query.productType) filter.productType = req.query.productType;

        const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);

        res.render('admin/products', {
            title: 'Products', pageTitle: 'Manage Products', currentPage: 'products', products,
            pagination: { currentPage: page, totalPages: Math.ceil(totalProducts / limit), totalProducts, limit },
            filters: { search: req.query.search || '', category: req.query.category || '', productType: req.query.productType || '' },
            success: req.query.success, error: req.query.error
        });
    } catch (error) {
        res.render('admin/products', { title: 'Products', currentPage: 'products', products: [], pagination: {}, filters: {}, error: 'Error loading products' });
    }
};

exports.getAddProduct = (req, res) => {
    res.render('admin/product-form', { title: 'Add Product', pageTitle: 'Add New Product', currentPage: 'add-product', product: null, isEdit: false });
};

exports.postAddProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, productType, stock } = req.body;
        await new Product({ name, price: parseFloat(price), description, image, category, productType, stock: parseInt(stock) }).save();
        res.redirect('/admin/products?success=Product added successfully');
    } catch (error) {
        res.render('admin/product-form', { title: 'Add Product', pageTitle: 'Add New Product', currentPage: 'add-product', product: req.body, isEdit: false, error: error.message });
    }
};

exports.getEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.redirect('/admin/products?error=Product not found');
        res.render('admin/product-form', { title: 'Edit Product', pageTitle: 'Edit Product', currentPage: 'products', product, isEdit: true });
    } catch (error) {
        res.redirect('/admin/products?error=Error loading product');
    }
};

exports.postEditProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, productType, stock } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, price: parseFloat(price), description, image, category, productType, stock: parseInt(stock) });
        res.redirect('/admin/products?success=Product updated successfully');
    } catch (error) {
        res.redirect(`/admin/products/edit/${req.params.id}?error=${error.message}`);
    }
};

exports.getDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.redirect('/admin/products?error=Product not found');
        res.render('admin/delete-confirm', { title: 'Delete Product', pageTitle: 'Confirm Delete', currentPage: 'products', product });
    } catch (error) {
        res.redirect('/admin/products?error=Error loading product');
    }
};

exports.postDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/products?success=Product deleted successfully');
    } catch (error) {
        res.redirect('/admin/products?error=Error deleting product');
    }
};

// Task 4: Order Management
exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const filter = req.query.status ? { status: req.query.status } : {};
        const orders = await Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        const totalOrders = await Order.countDocuments(filter);

        res.render('admin/orders', {
            title: 'Orders', pageTitle: 'Manage Orders', currentPage: 'orders', orders,
            statuses: Order.getStatuses(),
            pagination: { currentPage: page, totalPages: Math.ceil(totalOrders / limit), totalOrders, limit },
            filters: { status: req.query.status || '' },
            success: req.query.success, error: req.query.error
        });
    } catch (error) {
        res.render('admin/orders', { title: 'Orders', currentPage: 'orders', orders: [], statuses: ['Placed', 'Processing', 'Delivered'], pagination: {}, filters: {}, error: 'Error loading orders' });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.redirect('/admin/orders?error=Order not found');
        res.render('admin/order-details', {
            title: 'Order Details', pageTitle: `Order #${order._id.toString().slice(-8).toUpperCase()}`, currentPage: 'orders',
            order, nextStatus: order.getNextStatus(), statuses: Order.getStatuses(),
            success: req.query.success, error: req.query.error
        });
    } catch (error) {
        res.redirect('/admin/orders?error=Error loading order');
    }
};

exports.advanceOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.redirect('/admin/orders?error=Order not found');

        const currentStatus = order.status;
        if (!order.getNextStatus()) {
            return res.redirect(`/admin/orders/${req.params.id}?error=Order already at final status`);
        }

        order.advanceStatus();
        await order.save();
        res.redirect(`/admin/orders/${req.params.id}?success=Status updated from ${currentStatus} to ${order.status}`);
    } catch (error) {
        res.redirect(`/admin/orders/${req.params.id}?error=Error updating status`);
    }
};
