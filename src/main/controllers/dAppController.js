// src/main/controllers/dAppController.js

import { Controller, Get, Post, Body, Res, HttpStatus, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RateLimit } from 'express-rate-limit';
import * as helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CustomExceptionFilter } from '../filters/custom-exception.filter';

@Controller('dapp')
@UseFilters(CustomExceptionFilter) // Custom error handling
export class dAppController {
  private readonly logger = new Logger(dAppController.name);

  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  // Rate limiting middleware
  private rateLimiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

  @Get('data')
  @UseGuards(this.rateLimiter) // Apply rate limiting
  async getData(@Res() res: Response) {
    try {
      const cachedData = await this.cacheManager.get('dataKey');
      if (cachedData) {
        this.logger.log('Serving from cache');
        return res.status(HttpStatus.OK).json(cachedData);
      }

      // Simulate data fetching
      const data = await this.fetchDataFromSource();
      await this.cacheManager.set('dataKey', data, { ttl: 3600 }); // Cache for 1 hour
      this.logger.log('Serving fresh data');
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error('Error fetching data', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  @Post('submit')
  async submitData(@Body() body: any, @Res() res: Response) {
    // Input validation can be added here
    try {
      // Process the submitted data
      this.logger.log('Data submitted', body);
      return res.status(HttpStatus.CREATED).json({ message: 'Data submitted successfully' });
    } catch (error) {
      this.logger.error('Error submitting data', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  private async fetchDataFromSource() {
    // Simulate a data fetch operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'This is the fetched data' });
      }, 1000);
    });
  }
    }
