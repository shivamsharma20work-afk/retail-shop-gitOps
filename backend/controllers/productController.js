const Product = require('../models/productModel');

/**
 * @desc    Saare products database se fetch karne ke liye
 * @route   GET /api/products
 */
const getProducts = async (req, res) => {
    try {
        // Product.find({}) ka matlab hai saare documents uthao
        const products = await Product.find({});
        
        if (products.length === 0) {
            return res.status(200).json({ 
                message: "Bhai, DB khali hai! Pehle kuch products insert karo." 
            });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database se products load nahi ho paye." });
    }
};

/**
 * @desc    Single product ki detail fetch karna
 * @route   GET /api/products/:id
 */
const getProductById = async (req, res) => {
    try {
        // MongoDB ki default _id se dhoondhne ke liye findById use hota hai
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product nahi mila bhai!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Invalid Product ID ya server error." });
    }
};

module.exports = {
    getProducts,
    getProductById
};