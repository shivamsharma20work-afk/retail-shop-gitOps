const express = require('express');
const router = express.Router();
// Controller se functions import kar rahe hain
const { getProducts, getProductById } = require('../controllers/productController');

/**
 * @route   GET /api/products
 * @desc    Saare products fetch karne ke liye
 * @access  Public
 */
router.get('/products', getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Ek single product ki detail ke liye
 * @access  Public
 */
router.get('/products/:id', getProductById);

module.exports = router;