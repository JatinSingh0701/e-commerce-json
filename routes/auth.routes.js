const router = require("express").Router();
const authController = require("../controllers/auth.controller");

//Post request for signup
router.post("/signup", authController.signup);

//Post request for login
router.post("/login", authController.login);

module.exports = router;
