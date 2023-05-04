const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // Custom error object to make both message and status more dynamic
  const customError = {
    message: err.message || "Something went wrong",
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Mongoose validation error handler
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.status = StatusCodes.BAD_REQUEST;
  }

  // Mongoose cast error handler
  if (err.name === "CastError") {
    customError.message = `id: ${err.value} does not exist.`;
    customError.status = StatusCodes.NOT_FOUND;
  }

  // Mongoose unique index error handler
  if (err.code && err.code === 11000) {
    customError.message = `${err.keyValue.email} is already exist.`;
    customError.status = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.status).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
