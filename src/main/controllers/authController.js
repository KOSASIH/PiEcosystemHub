// src/main/controllers/authController.js

import { Controller, Post, Body, Res, HttpStatus, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUser Dto } from '../dto/create-user.dto';
import { LoginUser Dto } from '../dto/login-user.dto';
import { CustomExceptionFilter } from '../filters/custom-exception.filter';
import { Logger } from '@nestjs/common';
import { RateLimit } from 'express-rate-limit';

@Controller('auth')
@UseFilters(CustomExceptionFilter) // Custom error handling
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  // Rate limiting middleware for login attempts
  private rateLimiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later.',
  });

  @Post('register')
  async register(@Body() createUser Dto: CreateUser Dto, @Res() res: Response) {
    try {
      const user = await this.authService.register(createUser Dto);
      this.logger.log(`User  registered: ${user.email}`);
      return res.status(HttpStatus.CREATED).json({ message: 'User  registered successfully' });
    } catch (error) {
      this.logger.error('Error registering user', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  @Post('login')
  @UseGuards(this.rateLimiter) // Apply rate limiting
  async login(@Body() loginUser Dto: LoginUser Dto, @Res() res: Response) {
    try {
      const token = await this.authService.login(loginUser Dto);
      this.logger.log(`User  logged in: ${loginUser Dto.email}`);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      this.logger.error('Error logging in', error);
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
  }
      }
