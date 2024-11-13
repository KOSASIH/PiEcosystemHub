// src/models/Product.js

const { v4: uuidv4 } = require('uuid');
const currencyConfig = require('../config/currencyConfig');

class Product {
    constructor(name, basePrice, description = '', category = 'General') {
        this.id = uuidv4(); // Unique identifier for each product
        this.name = name;
        this.basePrice = basePrice; // Base price in Pi Coin
        this.description = description;
        this.category = category;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.validate();
    }

    // Validate product data
    validate() {
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Product name is required and must be a string.');
        }
        if (isNaN(this.basePrice) || this.basePrice <= 0) {
            throw new Error('Base price must be a positive number.');
        }
    }

    // Get the price in USD
    getPriceInUSD() {
        return this.basePrice * currencyConfig.getPiCoinValue();
    }

    // Get the price in a specified currency
    getPriceInCurrency(targetCurrency) {
        try {
            return currencyConfig.convertPiToCurrency(this.basePrice, targetCurrency);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    // Update product details
    updateProductDetails(newDetails) {
        const { name, basePrice, description, category } = newDetails;
        if (name) this.name = name;
        if (basePrice) {
            this.basePrice = basePrice;
            this.updatedAt = new Date(); // Update timestamp on price change
        }
        if (description) this.description = description;
        if (category) this.category = category;
    }

    // Get product summary
    getProductSummary() {
        return {
            id: this.id,
            name: this.name,
            basePrice: this.basePrice,
            priceInUSD: this.getPriceInUSD(),
            description: this.description,
            category: this.category,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

// Export the Product class
module.exports = Product;
