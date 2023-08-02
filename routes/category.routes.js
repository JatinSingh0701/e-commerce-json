const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const isAuth = require("../middleware/is.auth");

// Get request
router.get("/Categories", categoryController.getCategories);

router.get("/Category/:id", categoryController.getCategory);

// Post request
router.post("/Category", isAuth, categoryController.createCategory);

// Put request
router.put("/Category/:id", categoryController.updateCategory);

//Delete request
router.delete("/Category/:id", categoryController.deleteCategory);

module.exports = router;
