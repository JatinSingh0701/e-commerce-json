const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Secret key for jwt signing
const JWT_SECRET = "cat";

// post request for signup
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  
  // if (!errors.isEmpty()) {
  //   let errors = errors.array();
  //   if (errors[0].param == "email") {
  //     const error = new Error("Email is invalid");
  //     error.statusCode = 422;
  //     return next(error);
  //   } else if (errors[0].param == "password") {
  //     const error = new Error("Password is invalid");
  //     error.statusCode = 422;
  //     return next(error);
  //   }
  // }

  try {
    const existingUser = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!errors.isEmpty()) {
      const error = new Error("Email or password is invalid");
      error.statusCode = 422;
      return next(error);
    }

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
