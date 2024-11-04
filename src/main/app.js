// src/main/app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dAppRoutes = require('./routes/dAppRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(config.databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dapps', dAppRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
