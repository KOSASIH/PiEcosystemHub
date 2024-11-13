// src/services/PricingService.js

const currencyConfig = require('../config/currencyConfig');

class PricingService {
    constructor() {
        this.promotions = []; // Array to hold active promotions
    }

    // Calculate the price based on the base price in Pi Coin
    calculatePrice(basePrice) {
        return basePrice * currencyConfig.getPiCoinValue();
    }

    // Convert price to a specified currency
    convertPriceToCurrency(basePrice, targetCurrency) {
        try {
            return currencyConfig.convertPiToCurrency(basePrice, targetCurrency);
        } catch (error) {
            console.error('Currency conversion error:', error.message);
            return null;
        }
    }

    // Apply discount to the base price
    applyDiscount(basePrice, discountPercentage) {
        if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
            throw new Error('Discount percentage must be a number between 0 and 100.');
        }
        const discountAmount = (basePrice * discountPercentage) / 100;
        return basePrice - discountAmount;
    }

    // Add a promotion
    addPromotion(promotion) {
        this.promotions.push(promotion);
    }

    // Get active promotions
    getActivePromotions() {
        return this.promotions.filter(promo => promo.isActive);
    }

    // Calculate final price after applying promotions
    calculateFinalPrice(basePrice) {
        let finalPrice = basePrice;
        const activePromotions = this.getActivePromotions();

        activePromotions.forEach(promo => {
            finalPrice = this.applyDiscount(finalPrice, promo.discountPercentage);
        });

        return finalPrice;
    }
}

// Export an instance of PricingService
const pricingService = new PricingService();
module.exports = pricingService;
