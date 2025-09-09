const logger = require('./logger');
const Joi = require('joi');

// Centralized Express error handler
function errorHandler(err, req, res, next) {
  logger.error(err); // Winston logs everything

  // Joi validation error
  if (err.isJoi) {
    return res.status(400).json({
      type: 'ValidationError',
      message: err.details.map(d => d.message).join(', '),
    });
  }

  // Sequelize validation or constraint errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      type: err.name,
      message: err.errors.map(e => e.message).join(', '),
    });
  }

  // File upload errors (multer or custom)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      type: 'UploadError',
      message: 'File too large. Check upload size limit.',
    });
  }

  // Custom HTTP errors (optional)
  if (err.status) {
    return res.status(err.status).json({
      type: 'HttpError',
      message: err.message,
    });
  }

  // Fallback for unexpected errors
  res.status(500).json({
    type: 'ServerError',
    message: 'Something went wrong. Please try again later.',
  });
}

module.exports = errorHandler;
