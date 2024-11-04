// config/database.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
        };

        await mongoose.connect(dbURI, options);
        console.log('Successfully connected to the database.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToDatabase;
