// src/services/userService.js

import apiService from './apiService';

class UserService {
  async register(userData) {
    try {
      const response = await apiService.post('/auth/register', userData);
      return response; // Assuming the response contains user data or a success message
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);
      return response; // Assuming the response contains a token or user data
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUser Details(userId) {
    try {
      const response = await apiService.get(`/users/${userId}`);
      return response; // Assuming the response contains user details
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateUser (userId, userData) {
    try {
      const response = await apiService.put(`/users/${userId}`, userData);
      return response; // Assuming the response contains updated user data
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteUser (userId) {
    try {
      const response = await apiService.delete(`/users/${userId}`);
      return response; // Assuming the response contains a success message
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    // Customize error handling based on your application's needs
    if (error.status === 401) {
      return new Error('Unauthorized access. Please log in again.');
    } else if (error.status === 404) {
      return new Error('User  not found.');
    } else {
      return new Error(error.message || 'An unexpected error occurred.');
    }
  }
}

export default new UserService();
