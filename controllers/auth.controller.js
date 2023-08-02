const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Post request for login
exports.login = (req, res, next) => {
  user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        const error = new Error("User don,t exists plesae signup");
        error.statusCode = 404;
        return next(error);
      } else {
        bcrypt.compare(req.body.password, user.password).then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              {
                name: user.name,
                id: user.id,
              },
              "cat",
              {
                expiresIn: "1h",
              }
            );
            res.status(200).json({
              message: "login successfull",
              token: token,
            });
          } else {
            const error = new Error("invalid password or email");
            error.statusCode = 403;
            next(error);
          }
        });
      }
    });
};

// post request for signup
exports.signup = (req, res, next) => {
  user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (user) {
        const error = new Error("User already exists");
        error.statusCode = 403;
        next(error);
      } else {
        bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
          user
            .create({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
            })
            .then((result) => {
              res.status(201).json({
                mwssage: "signup successfull",
              });
            });
        });
      }
    });
};
