// src/main/routes/dAppRoutes.js

import { Router } from 'express';
import { dAppController } from '../controllers/dAppController';
import { validate } from '../middleware/validate.middleware';
import { CreateDataDto } from '../dto/create-data.dto';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { Logger } from '@nestjs/common';
import { RateLimit } from 'express-rate-limit';

const router = Router();
const logger = new Logger('dAppRoutes');

// Rate limiting middleware for specific routes
const rateLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Middleware to log requests
router.use((req, res, next) => {
  logger.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

// Public route to get data
router.get('/data', rateLimiter, dAppController.getData);

// Protected route to submit data
router.post('/submit', AuthMiddleware, validate(CreateDataDto), dAppController.submitData);

export default router;
