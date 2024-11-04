// src/main/routes/authRoutes.js

import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validate } from '../middleware/validate.middleware';
import { CreateUser Dto } from '../dto/create-user.dto';
import { LoginUser Dto } from '../dto/login-user.dto';
import { Logger } from '@nestjs/common';
import { RateLimit } from 'express-rate-limit';

const router = Router();
const logger = new Logger('AuthRoutes');

// Rate limiting middleware for login attempts
const loginRateLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
});

// Middleware to log requests
router.use((req, res, next) => {
  logger.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

// Route for user registration
router.post('/register', validate(CreateUser Dto), async (req, res) => {
  try {
    const user = await AuthController.register(req.body);
    logger.log(`User  registered: ${user.email}`);
    return res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    logger.error('Error registering user', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for user login
router.post('/login', loginRateLimiter, validate(LoginUser Dto), async (req, res) => {
  try {
    const token = await AuthController.login(req.body);
    logger.log(`User  logged in: ${req.body.email}`);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error('Error logging in', error);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
