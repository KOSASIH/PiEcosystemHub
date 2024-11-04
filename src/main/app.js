// src/main/app.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection } from 'typeorm'; // Assuming you're using TypeORM for database
import authRoutes from './routes/authRoutes';
import dAppRoutes from './routes/dAppRoutes';
import { CustomExceptionFilter } from './filters/custom-exception.filter'; // Custom error handling
import { Logger } from '@nestjs/common';

const app = express();
const logger = new Logger('App');

// Middleware setup
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('combined')); // HTTP request logging

// Database connection (example with TypeORM)
createConnection()
  .then(() => {
    logger.log('Database connected successfully');
  })
  .catch((error) => {
    logger.error('Database connection failed', error);
    process.exit(1); // Exit the process if the database connection fails
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dapp', dAppRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`Server is running on http://localhost:${PORT}`);
});
