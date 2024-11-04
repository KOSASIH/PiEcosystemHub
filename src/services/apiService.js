// src/services/apiService.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    timeout: 10000, // Set a timeout for requests
});

// Interceptors for request and response
apiClient.interceptors.request.use(
    (config) => {
        // Add authorization token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response) {
            console.error('API Error:', error.response.data);
            return Promise.reject(error.response.data);
        } else {
            console.error('Network Error:', error.message);
            return Promise.reject({ message: 'Network Error' });
        }
    }
);

export default apiClient;
