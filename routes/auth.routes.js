const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/auth.controller");

//Post request for signup
router.post(
  "/signup",
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").isLength({ min: 5 }).withMessage("Password is invalid"),
  authController.signup
);

//Post request for login
router.post("/login", authController.login);

module.exports = router;
