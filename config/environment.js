// config/environment.js

const dotenv = require('dotenv');

dotenv.config();

const environments = {
    development: {
        PORT: process.env.DEV_PORT || 3000,
        MONGODB_URI: process.env.DEV_MONGODB_URI || 'mongodb://localhost:27017/devdatabase',
        LOG_LEVEL: 'debug',
    },
    testing: {
        PORT: process.env.TEST_PORT || 3001,
        MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/testdatabase',
        LOG_LEVEL: 'error',
    },
    production: {
        PORT: process.env.PORT || 8080,
        MONGODB_URI: process.env.MONGODB_URI,
        LOG_LEVEL: 'warn',
    },
};

const currentEnvironment = process.env.NODE_ENV || 'development';

const config = environments[currentEnvironment];

if (!config) {
    throw new Error(`Environment configuration for "${currentEnvironment}" not found.`);
}

module.exports = config;
