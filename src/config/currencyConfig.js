// src/config/currencyConfig.js

const fs = require('fs').promises; // Use promises for async file operations
const path = require('path');
const axios = require('axios');

class CurrencyConfig {
    constructor() {
        this.piCoinValue = 314.159; // Set the static value of Pi Coin
        this.currencyRates = {}; // To store dynamic currency rates
        this.logFilePath = path.join(__dirname, 'currencyRates.log');
        this.piCoinValueLogPath = path.join(__dirname, 'piCoinValueChange.log');
        this.loadCurrencyRates();
    }

    // Load currency rates from an external API
    async loadCurrencyRates() {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            this.currencyRates = response.data.rates;
            await this.logCurrencyRates();
        } catch (error) {
            console.error('Error loading currency rates:', error.message);
            // Optionally, you could implement a retry mechanism here
        }
    }

    // Log the current currency rates to a file
    async logCurrencyRates() {
        const logData = `Currency Rates as of ${new Date().toISOString()}:\n${JSON.stringify(this.currencyRates, null, 2)}\n\n`;
        try {
            await fs.appendFile(this.logFilePath, logData);
        } catch (error) {
            console.error('Error logging currency rates:', error.message);
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

    // Update the Pi Coin value dynamically (if needed)
    updatePiCoinValue(newValue) {
        this.piCoinValue = newValue;
        this.logPiCoinValueChange(newValue);
    }

    // Log the change in Pi Coin value
    async logPiCoinValueChange(newValue) {
        const logData = `Pi Coin value changed to ${newValue} on ${new Date().toISOString()}\n`;
        try {
            await fs.appendFile(this.piCoinValueLogPath, logData);
        } catch (error) {
            console.error('Error logging Pi Coin value change:', error.message);
        }
    }
}

// Export an instance of CurrencyConfig
const currencyConfig = new CurrencyConfig();
module.exports = currencyConfig;
