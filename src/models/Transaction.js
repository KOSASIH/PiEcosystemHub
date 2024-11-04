// src/models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    dApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dApp',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
});

// Export the Transaction model
module.exports = mongoose.model('Transaction', transactionSchema);
