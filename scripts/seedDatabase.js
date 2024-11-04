// scripts/seedDatabase.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User'); // Adjust the path to your User model
const DApp = require('../models/DApp'); // Adjust the path to your DApp model

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database.');

        // Clear existing data
        await User.deleteMany({});
        await DApp.deleteMany({});
        console.log('Cleared existing data.');

        // Seed new data
        const users = await User.insertMany([
            { username: 'admin', email: 'admin@example.com', password: 'Password123!' },
            { username: 'user1', email: 'user1@example.com', password: 'Password123!' },
        ]);
        console.log('Seeded users:', users);

        const dApps = await DApp.insertMany([
            { name: 'DApp 1', description: 'Description for DApp 1', url: 'http://dapp1.com', createdBy: users[0]._id },
            { name: 'DApp 2', description: 'Description for DApp 2', url: 'http://dapp2.com', createdBy: users[1]._id },
        ]);
        console.log('Seeded dApps:', dApps);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

seedDatabase();
