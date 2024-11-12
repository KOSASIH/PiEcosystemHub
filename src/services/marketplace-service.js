// src/services/marketplace-service.js

const AuthService = require('./authService');
const ProductService = require('./productService');
const OrderService = require('./orderService');
const ReviewService = require('./reviewService');
const PaymentService = require('./paymentService');
const NotificationService = require('./notificationService');
const UserProfileService = require('./userProfileService');
const WishlistService = require('./wishlistService');
const SearchService = require('./searchService');
const AdminService = require('./adminService');
const DiscountService = require('./discountService');
const RateLimiter = require('express-rate-limit'); // Rate limiting
const CacheService = require('./cacheService'); // Caching service
const LoggerService = require('./loggerService'); // Logging service
const RecommendationService = require('./recommendationService'); // Recommendation service

class MarketplaceService {
  constructor() {
    this.rateLimiter = RateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // Limit each IP to 100 requests per windowMs
    });
  }

  // User Authentication
  async registerUser (username, password) {
    try {
      return await AuthService.register(username, password);
    } catch (error) {
      LoggerService.logError('Registration failed: ' + error.message);
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async loginUser (username, password) {
    try {
      return await AuthService.login(username, password);
    } catch (error) {
      LoggerService.logError('Login failed: ' + error.message);
      throw new Error('Login failed: ' + error.message);
    }
  }

  async getUser Profile(userId) {
    try {
      return await UserProfileService.getUser Profile(userId);
    } catch (error) {
      LoggerService.logError('Failed to get user profile: ' + error.message);
      throw new Error('Failed to get user profile: ' + error.message);
    }
  }

  async updateUser Profile(userId, profileData) {
    try {
      return await UserProfileService.updateUser Profile(userId, profileData);
    } catch (error) {
      LoggerService.logError('Failed to update user profile: ' + error.message);
      throw new Error('Failed to update user profile: ' + error.message);
    }
  }

  // Product Management
  async createProduct(productData) {
    try {
      return await ProductService.createProduct(productData);
    } catch (error) {
      LoggerService.logError('Failed to create product: ' + error.message);
      throw new Error('Failed to create product: ' + error.message);
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await ProductService.updateProduct(productId, productData);
    } catch (error) {
      LoggerService.logError('Failed to update product: ' + error.message);
      throw new Error('Failed to update product: ' + error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      return await ProductService.deleteProduct(productId);
    } catch (error) {
      LoggerService.logError('Failed to delete product: ' + error.message);
      throw new Error('Failed to delete product: ' + error.message);
    }
  }

  async getProducts(query, page, limit) {
    try {
      const cacheKey = `products:${query}:${page}:${limit}`;
      const cachedProducts = await CacheService.get(cacheKey);
      if (cachedProducts) {
        return cachedProducts;
      }
      const products = await ProductService.getProducts(query, page, limit);
      await CacheService.set(cacheKey, products);
      return products;
    } catch (error) {
      LoggerService.logError('Failed to get products: ' + error.message);
      throw new Error('Failed to get products: ' + error.message);
    }
  }

  // Order Management
  async createOrder(orderData) {
    try {
      return await OrderService.createOrder(orderData);
    } catch (error) {
      LoggerService.logError('Failed to create order: ' + error.message);
      throw new Error('Failed to create order: ' + error.message);
    }
  }

  async getOrder(orderId) {
    try {
      return await OrderService.getOrder(orderId);
    } catch (error) {
      LoggerService.logError('Failed to get order: ' + error.message);
      throw new Error('Failed to get order: ' + error.message);
    }
  }

  async getUser Orders(userId) {
    try {
      return await OrderService.getUser Orders(userId);
    } catch (error) {
      LoggerService.logError('Failed to get user orders: ' + error.message);
      throw new Error('Failed to get user orders: ' + error.message);
    }
  }

  async trackOrder(orderId) {
    try {
      return await OrderService.trackOrder(orderId);
    } catch (error) {
      LoggerService.logError('Failed to track order: ' + error.message);
      throw new Error('Failed to track order: ' + error.message);
    }
  }

  // Review Management
  async addReview(productId, reviewData) {
    try {
      return await ReviewService.addReview(productId, reviewData);
    } catch (error) {
      LoggerService.logError('Failed to add review: ' + error.message);
      throw new Error('Failed to add review: ' + error.message);
    }
  }

  async getReviews(productId) {
    try {
      return await ReviewService.getReviews(productId);
    } catch (error) {
      LoggerService.logError('Failed to get reviews: ' + error.message);
      throw new Error('Failed to get reviews: ' + error.message);
    }
  }

  // Payment Processing
  async processPayment(paymentData) {
    try {
      return await PaymentService.processPayment(paymentData);
    } catch (error) {
      LoggerService.logError('Payment processing failed: ' + error.message);
      throw new Error('Payment processing failed: ' + error.message);
    }
  }

  // Notifications
  async sendNotification(userId, message) {
    try {
      return await NotificationService.sendNotification(userId, message);
    } catch (error) {
      LoggerService.logError('Failed to send notification: ' + error.message);
      throw new Error('Failed to send notification: ' + error.message);
    }
  }

  // Wishlist Management
  async addToWishlist(userId, productId) {
    try {
      return await WishlistService.addToWishlist(userId, productId);
    } catch (error) {
      LoggerService.logError('Failed to add to wishlist: ' + error.message);
      throw new Error('Failed to add to wishlist: ' + error.message);
    }
  }

  async getWishlist(userId) {
    try {
      return await WishlistService.getWishlist(userId);
    } catch (error) {
      LoggerService.logError('Failed to get wishlist: ' + error.message);
      throw new Error('Failed to get wishlist: ' + error.message);
    }
  }

  async removeFromWishlist(userId, productId) {
    try {
      return await WishlistService.removeFromWishlist(userId, productId);
    } catch (error) {
      LoggerService.logError('Failed to remove from wishlist: ' + error.message);
      throw new Error('Failed to remove from wishlist: ' + error.message);
    }
  }

  // Advanced Search
  async searchProducts(query, filters) {
    try {
      return await SearchService.searchProducts(query, filters);
    } catch (error) {
      LoggerService.logError('Failed to search products: ' + error.message);
      throw new Error('Failed to search products: ' + error.message);
    }
  }

  // Admin Functions
  async getAllProducts() {
    try {
      return await AdminService.getAllProducts();
    } catch (error) {
      LoggerService.logError('Failed to get all products: ' + error.message);
      throw new Error('Failed to get all products: ' + error.message);
    }
  }

  async deleteProductById(productId) {
    try {
      return await AdminService.deleteProduct(productId);
    } catch (error) {
      LoggerService.logError('Failed to delete product by ID: ' + error.message);
      throw new Error('Failed to delete product by ID : ' + error.message);
    }
  }

  async updateProductById(productId, updateData) {
    try {
      return await AdminService.updateProduct(productId, updateData);
    } catch (error) {
      LoggerService.logError('Failed to update product by ID: ' + error.message);
      throw new Error('Failed to update product by ID: ' + error.message);
    }
  }

  // Discount Management
  async createDiscount(discountData) {
    try {
      return await DiscountService.createDiscount(discountData);
    } catch (error) {
      LoggerService.logError('Failed to create discount: ' + error.message);
      throw new Error('Failed to create discount: ' + error.message);
    }
  }

  async applyDiscount(orderId, discountCode) {
    try {
      return await DiscountService.applyDiscount(orderId, discountCode);
    } catch (error) {
      LoggerService.logError('Failed to apply discount: ' + error.message);
      throw new Error('Failed to apply discount: ' + error.message);
    }
  }

  // Recommendation System
  async getRecommendations(userId) {
    try {
      return await RecommendationService.getRecommendations(userId);
    } catch (error) {
      LoggerService.logError('Failed to get recommendations: ' + error.message);
      throw new Error('Failed to get recommendations: ' + error.message);
    }
  }
}

module.exports = new MarketplaceService();
