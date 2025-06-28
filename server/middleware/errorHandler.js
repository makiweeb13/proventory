// Custom error class
class ThrowError extends Error {
  constructor (status, message) {
    super(message);
    this.status = status || 500;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware for handling errors globally
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err); 

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
  
    return res.status(statusCode).json({
      status: 'error',
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Show stack trace only in development
    })
};

module.exports = {
  ThrowError,
  errorHandler
};