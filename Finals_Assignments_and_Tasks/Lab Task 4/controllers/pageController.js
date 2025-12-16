exports.getHome = (req, res) => {
    res.render('home', {
        title: 'BeStore - Home',
        currentPage: 'home'
    });
};

exports.getCheckout = (req, res) => {
    res.render('checkout', {
        title: 'Checkout - BeStore',
        currentPage: 'checkout'
    });
};

exports.getBrands = (req, res) => {
    res.render('brands', {
        title: 'Brands - BeStore',
        currentPage: 'brands'
    });
};

exports.getBlog = (req, res) => {
    res.render('blog', {
        title: 'Blog - BeStore',
        currentPage: 'blog'
    });
};

exports.getContact = (req, res) => {
    res.render('contact', {
        title: 'Contact Us - BeStore',
        currentPage: 'contact'
    });
};
