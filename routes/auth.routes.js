const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");

//Post request for signup
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  authController.signup
);

//Post request for login
router.post("/login", authController.login);

module.exports = router;
