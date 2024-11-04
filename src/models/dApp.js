// src/models/dApp.js

const mongoose = require('mongoose');

const dAppSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the dApp model
module.exports = mongoose.model('dApp', dAppSchema);
