const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Secret key for jwt signing
const JWT_SECRET = "cat";

// post request for signup
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      const error = new Error(firstError.msg);
      error.statusCode = 422;
      return next(error);
    }

    const existingUser = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 403;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }
};

// Post request for login
exports.login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      const error = new Error("User doesn't exist, please sign up");
      error.statusCode = 404;
      return next(error);
    }

    const doMatch = await bcrypt.compare(req.body.password, user.password);

    if (doMatch) {
      const token = jwt.sign(
        {
          name: user.name,
          id: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: "12h",
        }
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } else {
      const error = new Error("Invalid password or email");
      error.statusCode = 403;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
