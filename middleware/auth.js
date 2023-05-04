const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("../errors/customApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomApiError("Not authorized", StatusCodes.UNAUTHORIZED));
  }

  const token = authHeader.split(" ")[1];

  try {
    const { id, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, name };
    next();
  } catch (error) {
    return next(new CustomApiError("Not authorized", StatusCodes.UNAUTHORIZED));
  }
};

module.exports = authMiddleware;
