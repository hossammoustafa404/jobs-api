const express = require("express");
const { login, register } = require("../controllers/user");

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/register").post(register);

module.exports = userRouter;
