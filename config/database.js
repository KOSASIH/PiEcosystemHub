// config/database.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger'); // Assuming you have a logger utility

dotenv.config();

const connectToDatabase = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 5, // Maintain up to 5 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            useCreateIndex: true, // Use createIndex instead of ensureIndex
            useFindAndModify: false, // Use native findOneAndUpdate() rather than findAndModify()
        };

        // Connect to the database
        await mongoose.connect(dbURI, options);
        logger.info('Successfully connected to the database.');

        // Connection event listeners
        mongoose.connection.on('error', (error) => {
            logger.error('Database connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('Database connection lost. Attempting to reconnect...');
        });

        mongoose.connection.on('connected', () => {
            logger.info('Database connection established.');
        });

    } catch (error) {
        logger.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Gracefully handle process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.info('Database connection closed due to application termination.');
    process.exit(0);
});

module.exports = connectToDatabase;
