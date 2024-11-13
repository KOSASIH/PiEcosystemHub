// tests/PricingService.test.js

const pricingService = require('../src/services/PricingService');
const currencyConfig = require('../src/config/currencyConfig');

// Mock the currencyConfig methods for testing
jest.mock('../src/config/currencyConfig', () => ({
    getPiCoinValue: jest.fn(),
    convertPiToCurrency: jest.fn(),
}));

describe('PricingService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should calculate price in USD correctly', () => {
        currencyConfig.getPiCoinValue.mockReturnValue(10); // Mock Pi Coin value to 10 USD
        const basePrice = 1.5; // Base price in Pi Coin
        const expectedPrice = basePrice * 10; // Expected price in USD

        const priceInUSD = pricingService.calculatePrice(basePrice);
        expect(priceInUSD).toBe(expectedPrice);
    });

    test('should convert price to specified currency', () => {
        currencyConfig.convertPiToCurrency.mockReturnValue(15); // Mock conversion result
        const basePrice = 1.5; // Base price in Pi Coin
        const targetCurrency = 'EUR';

        const priceInCurrency = pricingService.convertPriceToCurrency(basePrice, targetCurrency);
        expect(priceInCurrency).toBe(15);
        expect(currencyConfig.convertPiToCurrency).toHaveBeenCalledWith(basePrice, targetCurrency);
    });

    test('should apply discount correctly', () => {
        const basePrice = 100; // Base price in Pi Coin
        const discountPercentage = 10; // 10% discount
        const expectedDiscountedPrice = basePrice - (basePrice * discountPercentage) / 100;

        const discountedPrice = pricingService.applyDiscount(basePrice, discountPercentage);
        expect(discountedPrice).toBe(expectedDiscountedPrice);
    });

    test('should throw error for invalid discount percentage', () => {
        const basePrice = 100;

        expect(() => pricingService.applyDiscount(basePrice, -5)).toThrow('Discount percentage must be a number between 0 and 100.');
        expect(() => pricingService.applyDiscount(basePrice, 110)).toThrow('Discount percentage must be a number between 0 and 100.');
    });

    test('should add and retrieve active promotions', () => {
        const promotion = { discountPercentage: 20, isActive: true };
        pricingService.addPromotion(promotion);

        const activePromotions = pricingService.getActivePromotions();
        expect(activePromotions).toContain(promotion);
    });

    test('should calculate final price after applying promotions', () => {
        const basePrice = 100; // Base price in Pi Coin
        pricingService.addPromotion({ discountPercentage: 10, isActive: true }); // 10% promotion
        pricingService.addPromotion({ discountPercentage: 5, isActive: true }); // 5% promotion

        const finalPrice = pricingService.calculateFinalPrice(basePrice);
        const expectedFinalPrice = basePrice - (basePrice * 10) / 100 - (basePrice * 5) / 100;

        expect(finalPrice).toBe(expectedFinalPrice);
    });
});
