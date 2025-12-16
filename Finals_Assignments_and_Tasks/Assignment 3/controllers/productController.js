// Product Controller - Handles product-related pages and API
const Product = require('../models/ProductSchema');

// For Her Page - Server-side rendering
exports.getForHer = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const productType = req.query.productType || '';
        const sortBy = req.query.sortBy || '';
        const minPrice = req.query.minPrice || '';
        const maxPrice = req.query.maxPrice || '';

        const filter = { category: 'for-her' };
        if (productType) filter.productType = productType;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        let sort = {};
        if (sortBy === 'price-low') sort.price = 1;
        else if (sortBy === 'price-high') sort.price = -1;
        else if (sortBy === 'name') sort.name = 1;
        else sort.createdAt = -1;

        const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('for-her', {
            title: 'For Her - BeStore',
            currentPage: 'for-her',
            products,
            pagination: { currentPage: page, totalPages, totalProducts, limit, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
            filters: { productType, sortBy, minPrice, maxPrice }
        });
    } catch (error) {
        console.error('For Her page error:', error);
        res.render('for-her', {
            title: 'For Her - BeStore',
            currentPage: 'for-her',
            products: [],
            pagination: { currentPage: 1, totalPages: 0, totalProducts: 0, limit: 10 },
            filters: {},
            error: 'Error loading products'
        });
    }
};

// For Him Page - Server-side rendering
exports.getForHim = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const productType = req.query.productType || '';
        const sortBy = req.query.sortBy || '';
        const minPrice = req.query.minPrice || '';
        const maxPrice = req.query.maxPrice || '';

        const filter = { category: 'for-him' };
        if (productType) filter.productType = productType;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        let sort = {};
        if (sortBy === 'price-low') sort.price = 1;
        else if (sortBy === 'price-high') sort.price = -1;
        else if (sortBy === 'name') sort.name = 1;
        else sort.createdAt = -1;

        const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('for-him', {
            title: 'For Him - BeStore',
            currentPage: 'for-him',
            products,
            pagination: { currentPage: page, totalPages, totalProducts, limit, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
            filters: { productType, sortBy, minPrice, maxPrice }
        });
    } catch (error) {
        console.error('For Him page error:', error);
        res.render('for-him', {
            title: 'For Him - BeStore',
            currentPage: 'for-him',
            products: [],
            pagination: { currentPage: 1, totalPages: 0, totalProducts: 0, limit: 10 },
            filters: {},
            error: 'Error loading products'
        });
    }
};

// API: Get all products with filters
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.productType) filter.productType = req.query.productType;
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }

        let sort = {};
        if (req.query.sortBy === 'price-low') sort.price = 1;
        else if (req.query.sortBy === 'price-high') sort.price = -1;
        else if (req.query.sortBy === 'name') sort.name = 1;
        else sort.createdAt = -1;

        const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            success: true,
            data: products,
            pagination: { currentPage: page, totalPages, totalProducts, limit, hasNextPage: page < totalPages, hasPrevPage: page > 1 }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// API: Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
