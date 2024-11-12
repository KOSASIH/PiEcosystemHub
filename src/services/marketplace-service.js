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

class MarketplaceService {
  // User Authentication
  async registerUser (username, password) {
    try {
      return await AuthService.register(username, password);
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async loginUser (username, password) {
    try {
      return await AuthService.login(username, password);
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  async getUser Profile(userId) {
    try {
      return await UserProfileService.getUser Profile(userId);
    } catch (error) {
      throw new Error('Failed to get user profile: ' + error.message);
    }
  }

  async updateUser Profile(userId, profileData) {
    try {
      return await UserProfileService.updateUser Profile(userId, profileData);
    } catch (error) {
      throw new Error('Failed to update user profile: ' + error.message);
    }
  }

  // Product Management
  async createProduct(productData) {
    return await ProductService.createProduct(productData);
  }

  async updateProduct(productId, productData) {
    return await ProductService.updateProduct(productId, productData);
  }

  async deleteProduct(productId) {
    return await ProductService.deleteProduct(productId);
  }

  async getProducts(query, page, limit) {
    return await ProductService.getProducts(query, page, limit);
  }

  // Order Management
  async createOrder(orderData) {
    return await OrderService.createOrder(orderData);
  }

  async getOrder(orderId) {
    return await OrderService.getOrder(orderId);
  }

  async getUser Orders(userId) {
    return await OrderService.getUser Orders(userId);
  }

  async trackOrder(orderId) {
    return await OrderService.trackOrder(orderId);
  }

  // Review Management
  async addReview(productId, reviewData) {
    return await ReviewService.addReview(productId, reviewData);
  }

  async getReviews(productId) {
    return await ReviewService.getReviews(productId);
  }

  // Payment Processing
  async processPayment(paymentData) {
    return await PaymentService.processPayment(paymentData);
  }

  // Notifications
  async sendNotification(userId, message) {
    return await NotificationService.sendNotification(userId, message);
  }

  // Wishlist Management
  async addToWishlist(userId, productId) {
    return await WishlistService.addToWishlist(userId, productId);
  }

  async getWishlist(userId) {
    return await WishlistService.getWishlist(userId);
  }

  async removeFromWishlist(userId, productId) {
    return await WishlistService.removeFromWishlist(userId, productId);
  }

  // Advanced Search
  async searchProducts(query, filters) {
    return await SearchService.searchProducts(query, filters);
  }

  // Admin Functions
  async getAllProducts() {
    return await AdminService.getAllProducts();
  }

  async deleteProductById(productId) {
    return await AdminService.deleteProduct(productId);
  }

  async updateProductById(productId, updateData) {
    return await AdminService.updateProduct(productId, updateData);
  }

  // Discount Management
  async createDiscount(discountData) {
    return await DiscountService.createDiscount(discountData);
  }

  async applyDiscount(orderId, discountCode) {
    return await DiscountService.applyDiscount(orderId, discountCode);
  }
}

module.exports = new MarketplaceService();
