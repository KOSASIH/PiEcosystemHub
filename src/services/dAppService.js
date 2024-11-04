// src/services/dAppService.js

import apiClient from './apiService';

const dAppService = {
    getAllDApps: async () => {
        try {
            const response = await apiClient.get('/dapps');
            return response.data;
        } catch (error) {
            throw error; // Propagate error to be handled by the calling function
        }
    },

    createDApp: async (dAppData) => {
        try {
            const response = await apiClient.post('/dapps', dAppData);
            return response.data;
        } catch (error) {
            throw error; // Propagate error to be handled by the calling function
        }
    },

    getDAppById: async (id) => {
        try {
            const response = await apiClient.get(`/dapps/${id}`);
            return response.data;
        } catch (error) {
            throw error; // Propagate error to be handled by the calling function
        }
    },
};

export default dAppService;
