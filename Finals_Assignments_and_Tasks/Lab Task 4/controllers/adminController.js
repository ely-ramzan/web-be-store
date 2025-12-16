// Admin Controller - Handles admin panel operations
const Product = require('../models/ProductSchema');

// Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const forHimCount = await Product.countDocuments({ category: 'for-him' });
        const forHerCount = await Product.countDocuments({ category: 'for-her' });
        const clothingCount = await Product.countDocuments({ productType: 'clothing' });
        const shoesCount = await Product.countDocuments({ productType: 'shoes' });
        const accessoriesCount = await Product.countDocuments({ productType: 'accessories' });
        const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

        res.render('admin/dashboard', {
            title: 'Dashboard',
            pageTitle: 'Dashboard',
            currentPage: 'dashboard',
            stats: { totalProducts, forHimCount, forHerCount, clothingCount, shoesCount, accessoriesCount },
            recentProducts
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.render('admin/dashboard', {
            title: 'Dashboard',
            currentPage: 'dashboard',
            stats: { totalProducts: 0, forHimCount: 0, forHerCount: 0, clothingCount: 0, shoesCount: 0, accessoriesCount: 0 },
            recentProducts: [],
            error: 'Error loading dashboard'
        });
    }
};

// Product List (READ)
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const productType = req.query.productType || '';

        const filter = {};
        if (search) filter.name = { $regex: search, $options: 'i' };
        if (category) filter.category = category;
        if (productType) filter.productType = productType;

        const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('admin/products', {
            title: 'Products',
            pageTitle: 'Manage Products',
            currentPage: 'products',
            products,
            pagination: { currentPage: page, totalPages, totalProducts, limit },
            filters: { search, category, productType },
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        console.error('Products list error:', error);
        res.render('admin/products', {
            title: 'Products',
            currentPage: 'products',
            products: [],
            pagination: { currentPage: 1, totalPages: 0, totalProducts: 0, limit: 10 },
            filters: {},
            error: 'Error loading products'
        });
    }
};

// Add Product Form (CREATE - GET)
exports.getAddProduct = (req, res) => {
    res.render('admin/product-form', {
        title: 'Add Product',
        pageTitle: 'Add New Product',
        currentPage: 'add-product',
        product: null,
        isEdit: false
    });
};

// Add Product (CREATE - POST)
exports.postAddProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, productType, stock } = req.body;
        const product = new Product({
            name,
            price: parseFloat(price),
            description,
            image,
            category,
            productType,
            stock: parseInt(stock)
        });
        await product.save();
        res.redirect('/admin/products?success=Product added successfully');
    } catch (error) {
        console.error('Add product error:', error);
        res.render('admin/product-form', {
            title: 'Add Product',
            pageTitle: 'Add New Product',
            currentPage: 'add-product',
            product: req.body,
            isEdit: false,
            error: 'Error adding product: ' + error.message
        });
    }
};

// Edit Product Form (UPDATE - GET)
exports.getEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.redirect('/admin/products?error=Product not found');
        }
        res.render('admin/product-form', {
            title: 'Edit Product',
            pageTitle: 'Edit Product',
            currentPage: 'products',
            product,
            isEdit: true
        });
    } catch (error) {
        console.error('Edit product error:', error);
        res.redirect('/admin/products?error=Error loading product');
    }
};

// Update Product (UPDATE - POST)
exports.postEditProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, productType, stock } = req.body;
        await Product.findByIdAndUpdate(req.params.id, {
            name,
            price: parseFloat(price),
            description,
            image,
            category,
            productType,
            stock: parseInt(stock)
        });
        res.redirect('/admin/products?success=Product updated successfully');
    } catch (error) {
        console.error('Update product error:', error);
        res.redirect(`/admin/products/edit/${req.params.id}?error=${error.message}`);
    }
};

// Delete Confirmation Page (DELETE - GET)
exports.getDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.redirect('/admin/products?error=Product not found');
        }
        res.render('admin/delete-confirm', {
            title: 'Delete Product',
            pageTitle: 'Confirm Delete',
            currentPage: 'products',
            product
        });
    } catch (error) {
        res.redirect('/admin/products?error=Error loading product');
    }
};

// Delete Product (DELETE - POST)
exports.postDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/products?success=Product deleted successfully');
    } catch (error) {
        console.error('Delete product error:', error);
        res.redirect('/admin/products?error=Error deleting product');
    }
};
