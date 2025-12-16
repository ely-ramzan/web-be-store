// Page Controller - Handles static page rendering

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
