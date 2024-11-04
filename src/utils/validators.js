// src/utils/validators.js

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number

/**
 * Validate email format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const validateEmail = (email) => {
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - The password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const validatePassword = (password) => {
    return passwordRegex.test(password);
};

/**
 * Validate if a string is not empty
 * @param {string} str - The string to validate
 * @returns {boolean} - True if not empty, false otherwise
 */
const validateNotEmpty = (str) => {
    return str && str.trim().length > 0;
};

/**
 * Validate if a number is within a specified range
 * @param {number} num - The number to validate
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {boolean} - True if within range, false otherwise
 */
const validateNumberInRange = (num, min, max) => {
    return typeof num === 'number' && num >= min && num <= max;
};

module.exports = {
    validateEmail,
    validatePassword,
    validateNotEmpty,
    validateNumberInRange,
};
