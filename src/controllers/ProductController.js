// src/controllers/ProductController.js

const Product = require('../models/Product');
const pricingService = require('../services/PricingService');

class ProductController {
    constructor() {
        this.products = []; // In-memory storage for products (replace with a database in production)
    }

    // Create a new product
    createProduct(req, res) {
        try {
            const { name, basePrice, description, category } = req.body;
            const newProduct = new Product(name, basePrice, description, category);
            this.products.push(newProduct);
            res.status(201).json(newProduct.getProductSummary());
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all products
    getAllProducts(req, res) {
        const productSummaries = this.products.map(product => product.getProductSummary());
        res.status(200).json(productSummaries);
    }

    // Get a product by ID
    getProductById(req, res) {
        const { id } = req.params;
        const product = this.products.find(p => p.id === id);
        if (product) {
            res.status(200).json(product.getProductSummary());
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    }

    // Update a product by ID
    updateProduct(req, res) {
        const { id } = req.params;
        const product = this.products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        try {
            product.updateProductDetails(req.body);
            res.status(200).json(product.getProductSummary());
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a product by ID
    deleteProduct(req, res) {
        const { id } = req.params;
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        this.products.splice(productIndex, 1);
        res.status(204).send(); // No content
    }

    // Get product price in specified currency
    getProductPriceInCurrency(req, res) {
        const { id, currency } = req.params;
        const product = this.products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const priceInCurrency = pricingService.convertPriceToCurrency(product.basePrice, currency);
        if (priceInCurrency === null) {
            return res.status(400).json({ error: 'Currency conversion failed' });
        }

        res.status(200).json({ priceInCurrency });
    }
}

// Export an instance of ProductController
const productController = new ProductController();
module.exports = productController;
