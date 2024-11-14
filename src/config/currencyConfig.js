// src/config/currencyConfig.js

const fs = require('fs').promises; // Use promises for async file operations
const path = require('path');
const axios = require('axios');
const winston = require('winston');
const WebSocket = require('ws');

class CurrencyConfig {
    constructor() {
        this.piCoinValue = 314.159; // Set the static value of Pi Coin
        this.currencyRates = {}; // To store dynamic currency rates
        this.logFilePath = path.join(__dirname, 'currencyRates.log');
        this.piCoinValueLogPath = path.join(__dirname, 'piCoinValueChange.log');
        this.apiEndpoint = process.env.CURRENCY_API_URL || 'https://api.exchangerate-api.com/v4/latest/USD';
        this.cache = {};
        this.loadCurrencyRates();
        this.setupWebSocket();
        this.logger = this.setupLogger();
    }

    // Setup logger using Winston
    setupLogger() {
        return winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ filename: this.logFilePath }),
                new winston.transports.Console()
            ]
        });
    }

    // Setup WebSocket for real-time currency updates (example URL)
    setupWebSocket() {
        const ws = new WebSocket('wss://example.com/currency-updates');
        ws.on('message', (data) => {
            const rates = JSON.parse(data);
            this.updateCurrencyRates(rates);
        });
        ws.on('error', (error) => {
            this.logger.error('WebSocket error:', error.message);
        });
    }

    // Load currency rates from an external API
    async loadCurrencyRates(retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await axios.get(this.apiEndpoint);
                this.currencyRates = response.data.rates;
                await this.logCurrencyRates();
                return; // Exit if successful
            } catch (error) {
                this.logger.error(`Attempt ${i + 1} failed to load currency rates: ${error.message}`);
                if (i === retries - 1) {
                    this.logger.error('All attempts to load currency rates failed.');
                }
            }
        }
    }

    // Update currency rates from WebSocket or API
    updateCurrencyRates(newRates) {
        this.currencyRates = { ...this.currencyRates, ...newRates };
        this.logCurrencyRates();
    }

    // Log the current currency rates to a file
    async logCurrencyRates() {
        const logData = `Currency Rates as of ${new Date().toISOString()}:\n${JSON.stringify(this.currencyRates, null, 2)}\n\n`;
        try {
            await fs.appendFile(this.logFilePath, logData);
            this.logger.info('Currency rates logged successfully.');
        } catch (error) {
            this.logger.error('Error logging currency rates:', error.message);
        }
    }

    // Convert Pi Coin value to another currency
    convertPiToCurrency(amount, targetCurrency) {
        if (!this.currencyRates[targetCurrency]) {
            throw new Error(`Currency ${targetCurrency} not supported.`);
        }
        const convertedValue = amount * this.piCoinValue * this.currencyRates[targetCurrency];
        return convertedValue;
    }

    // Get the current value of Pi Coin
    getPiCoinValue() {
        return this.piCoinValue;
    }

    // Update the Pi Coin value dynamically to maintain stability
    async updatePiCoinValue(newValue) {
        const targetValue = 314.159; // Target stable value
        const fluctuationThreshold = 0.01; // Allowable fluctuation

        if (Math.abs(newValue - targetValue) > fluctuationThreshold) {
            this.piCoinValue = targetValue; // Reset the value to the target stable value
            await this.logPiCoinValueChange(this.piCoinValue);
            this.logger.info(`Pi Coin value adjusted to maintain stability: ${this.piCoinValue}`);
        } else {
            this.piCoinValue = newValue; // Update to new value if within threshold
            await this.logPiCoinValueChange(newValue);
        }
    }

    // Log the change in Pi Coin value
    async logPiCoinValueChange(newValue) {
        const logData = `Pi Coin value changed to ${newValue} on ${new Date().toISOString()}\n`;
        try {
            await fs.appendFile(this.piCoinValueLogPath, logData);
            this.logger.info('Pi Coin value change logged successfully.');
        } catch (error) {
            this.logger.error('Error logging Pi Coin value change:', error.message);
        }
    }
}

// Export an instance of CurrencyConfig
const currencyConfig = new CurrencyConfig();
module.exports = currencyConfig;
