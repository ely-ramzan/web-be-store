const express = require('express');
const router = express.Router();

// Import Controller
const adminController = require('../controllers/adminController');

// Dashboard
router.get('/', adminController.getDashboard);

// Products CRUD
router.get('/products', adminController.getProducts);
router.get('/products/add', adminController.getAddProduct);
router.post('/products/add', adminController.postAddProduct);
router.get('/products/edit/:id', adminController.getEditProduct);
router.post('/products/edit/:id', adminController.postEditProduct);
router.get('/products/delete/:id', adminController.getDeleteProduct);
router.post('/products/delete/:id', adminController.postDeleteProduct);

module.exports = router;
