// src/main/config.js

require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    databaseUri: process.env.DATABASE_URI || 'mongodb://localhost:27017/piecosystemhub',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    // Add other configuration settings as needed
};

module.exports = config;
