// src/middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err); // Log the error for debugging

    const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
    const message = err.message || 'Internal Server Error'; // Default message

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Show stack trace in development
    });
};

module.exports = errorMiddleware;
