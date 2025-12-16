// Page Controller - Handles all page rendering for Lab Task 03

// Home Page
exports.getHome = (req, res) => {
    res.render('home', {
        title: 'BeStore - Home',
        currentPage: 'home'
    });
};

// Checkout Page
exports.getCheckout = (req, res) => {
    res.render('checkout', {
        title: 'Checkout - BeStore',
        currentPage: 'checkout'
    });
};

// For Her Category Page
exports.getForHer = (req, res) => {
    res.render('for-her', {
        title: 'For Her - BeStore',
        currentPage: 'for-her'
    });
};

// For Him Category Page
exports.getForHim = (req, res) => {
    res.render('for-him', {
        title: 'For Him - BeStore',
        currentPage: 'for-him'
    });
};

// Brands Page
exports.getBrands = (req, res) => {
    res.render('brands', {
        title: 'Brands - BeStore',
        currentPage: 'brands'
    });
};

// Blog Page
exports.getBlog = (req, res) => {
    res.render('blog', {
        title: 'Blog - BeStore',
        currentPage: 'blog'
    });
};

// Contact Page
exports.getContact = (req, res) => {
    res.render('contact', {
        title: 'Contact Us - BeStore',
        currentPage: 'contact'
    });
};
