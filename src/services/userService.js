// src/services/userService.js

import apiClient from './apiService';

const userService = {
    register: async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error; // Propagate error to be handled by the calling function
        }
    },

    login: async (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token); // Store token in local storage
            return response.data;
        } catch (error) {
            throw error; // Propagate error to be handled by the calling function
        }
    },

    logout: () => {
        localStorage.removeItem('token'); // Clear token on logout
    },

    getUser Profile: async () => {
        try {
            const response = await apiClient.get('/user/profile');
            return response.data;
        } catch (error) {
            throw error; // Propagate error to be handled by the calling function
        }
    },
};

export default userService;
