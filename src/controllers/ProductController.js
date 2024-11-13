// src/controllers/ProductController.js

const Product = require('../models/Product');
const pricingService = require('../services/PricingService');
const logger = require('../utils/logger'); // Assuming you have a logger utility
const { validateProduct } = require('../validators/productValidator'); // Assuming you have a validation utility

class ProductController {
    constructor(productModel) {
        this.productModel = productModel; // Use a database model for production
    }

    // Create a new product
    async createProduct(req, res) {
        try {
            const { error } = validateProduct(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { name, basePrice, description, category } = req.body;
            const newProduct = new this.productModel({ name, basePrice, description, category });
            await newProduct.save(); // Save to the database
            logger.info(`Product created: ${newProduct.id}`);
            res.status(201).json(newProduct.getProductSummary());
        } catch (error) {
            logger.error('Error creating product:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get all products
    async getAllProducts(req, res) {
        try {
            const products = await this.productModel.find(); // Fetch from the database
            const productSummaries = products.map(product => product.getProductSummary());
            res.status(200).json(productSummaries);
        } catch (error) {
            logger.error('Error fetching products:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get a product by ID
    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productModel.findById(id); // Fetch from the database
            if (product) {
                res.status(200).json(product.getProductSummary());
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            logger.error('Error fetching product:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Update a product by ID
    async updateProduct(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productModel.findById(id); // Fetch from the database
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const { error } = validateProduct(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            product.updateProductDetails(req.body);
            await product.save(); // Save updated product to the database
            logger.info(`Product updated: ${product.id}`);
            res.status(200).json(product.getProductSummary());
        } catch (error) {
            logger.error('Error updating product:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Delete a product by ID
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productModel.findByIdAndDelete(id); // Delete from the database
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            logger.info(`Product deleted: ${id}`);
            res.status(204).send(); // No content
        } catch (error) {
            logger.error('Error deleting product:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get product price in specified currency
    async getProductPriceInCurrency(req, res) {
        const { id, currency } = req.params;
        try {
            const product = await this.productModel.findById(id); // Fetch from the database
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const priceInCurrency = pricingService.convertPriceToCurrency(product.basePrice, currency);
            if (priceInCurrency === null) {
                return res.status(400).json({ error: 'Currency conversion failed' });
            }

            res.status(200).json({ priceInCurrency });
        } catch (error) {
            logger.error('Error fetching product price in currency:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// Export an instance of ProductController
const productController = new ProductController(Product); // Pass the Product model to the controller
module.exports = productController;
