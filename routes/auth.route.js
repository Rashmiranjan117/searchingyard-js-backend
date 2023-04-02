const { UserModel } = require("../models/auth.model");
const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// credentials
const authController = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.signup);
authRouter.post("/login", authController.login);

module.exports = { authRouter };
