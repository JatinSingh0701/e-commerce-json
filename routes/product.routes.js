const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const productController = require("../controllers/product.controller");
const isAuth = require("../middleware/is.auth");

// Get request
router.get("/products", productController.getProducts);

router.get("/product/:id", productController.getProduct);

// Post request
router.post("/product", isAuth, productController.createProduct);

// Put request
router.put(
  "/product/:id",
  isAuth,
  body("name").not().isEmpty(),
  productController.updateProduct
);

//Delete request
router.delete("/product/:id", isAuth, productController.deleteProduct);

module.exports = router;
