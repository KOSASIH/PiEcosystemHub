// src/utils/helpers.js

const { v4: uuidv4 } = require('uuid');

/**
 * Generate a unique identifier
 * @returns {string} - A unique identifier
 */
const generateUniqueId = () => {
    return uuidv4();
};

/**
 * Format a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

/**
 * Deep clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} - A deep clone of the object
 */
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if an object is empty
 * @param {Object} obj - The object to check
 * @returns {boolean} - True if empty, false otherwise
 */
const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

/**
 * Delay execution for a specified amount of time
 * @param {number} ms - The number of milliseconds to delay
 * @returns {Promise} - A promise that resolves after the delay
 */
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    generateUniqueId,
    formatDate,
    deepClone,
    isEmptyObject,
    delay,
};
