const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value:${value} Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, Please login again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again!!', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  // console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //Programming or other unknown error: don't leak error details
  else {
    // 1) Log Error
    console.error('ERROR 🎃', err);

    //2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong ',
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production ') {
    //console.log(err.constructor.name);
    // let error = { ...err };
    let error = Object.assign(err);
    if (error.constructor.name === 'CastError')
      error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.constructor.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.constructor.name === 'JsonWebTokenError')
      error = handleJWTError();
    if (error.constructor.name === 'TokenExpiredError')
      error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
