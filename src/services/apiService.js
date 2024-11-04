// src/services/apiService.js

import axios from 'axios';
import { Logger } from '@nestjs/common';

const logger = new Logger('ApiService');

class ApiService {
  constructor(baseURL) {
    this.apiClient = axios.create({
      baseURL,
      timeout: 10000, // Set a timeout for requests
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptors for request and response
    this.apiClient.interceptors.request.use(
      (config) => {
        // You can add authorization tokens or other headers here
        logger.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error('Request error', error);
        return Promise.reject(error);
      }
    );

    this.apiClient.interceptors.response.use(
      (response) => {
        logger.log(`Response: ${response.status} ${response.config.url}`);
        return response.data; // Return only the data part of the response
      },
      (error) => {
        logger.error('Response error', error);
        // Handle specific error responses
        if (error.response) {
          return Promise.reject({
            status: error.response.status,
            message: error.response.data.message || 'An error occurred',
          });
        }
        return Promise.reject({
          status: 500,
          message: 'Network Error',
        });
      }
    );
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.apiClient.get(endpoint, { params });
      return response;
    } catch (error) {
      throw error; // Rethrow the error for handling in the calling function
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.apiClient.post(endpoint, data);
      return response;
    } catch (error) {
      throw error; // Rethrow the error for handling in the calling function
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.apiClient.put(endpoint, data);
      return response;
    } catch (error) {
      throw error; // Rethrow the error for handling in the calling function
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.apiClient.delete(endpoint);
      return response;
    } catch (error) {
      throw error; // Rethrow the error for handling in the calling function
    }
  }
}

export default new ApiService(process.env.API_BASE_URL); // Set your base URL in environment variables
