const Category = require("../models/categrory.model");

// GET request
exports.getCategories = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.status(200).json({
        message: "Categories fetched successfully",
        categories,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCategory = (req, res, next) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        return res.status(400).json({
          message: "Category not found",
        });
      }
      res.status(200).json({
        category,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// POST request
exports.createCategory = (req, res, next) => {
  Category.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  })
    .then((result) => {
      res.status(201).json({
        message: "Category created successfully",
        category: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// PUT request
exports.updateCategory = (req, res, next) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      category.name = req.body.name;
      category.description = req.body.description;
      category.price = req.body.price;
      return category.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Category updated successfully",
        category: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// DELETE request
exports.deleteCategory = (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      res.status(200).json({
        message: "Category deleted successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
