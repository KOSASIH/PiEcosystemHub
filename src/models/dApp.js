// src/models/dApp.js

import mongoose from 'mongoose';

const dAppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Simple URL validation
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before saving
dAppSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const dApp = mongoose.model('dApp', dAppSchema);

export default dApp;
