const User = require("../models/user");
const CustomApiError = require("../errors/customApiError");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequestError");

require("dotenv").config();

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password must be provided.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomApiError("Wrong email.");
  }

  const correctPass = await user.comparePassword(password);

  if (!correctPass) {
    throw new BadRequestError("Wrong password.");
  }

  const token = user.createJWT();

  res.status(StatusCodes.ACCEPTED).json({ user: { name: user.name }, token });
};

// Register
const register = async (req, res) => {
  // await User.init(); I used this method to solve the problem of dubplicate emails with the same indeces

  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
