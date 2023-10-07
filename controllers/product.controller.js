const product = require("../models/product.model");

// GET request
exports.getProducts = (req, res, next) => {
  product.findAll()
    .then((products) => {
      res.status(200).json({
        message: "products fetched successfully",
        products,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        return res.status(400).json({
          message: "product not found",
        });
      }
      res.status(200).json({
        product,
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
exports.createProduct = (req, res, next) => {
  product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
  })
    .then((result) => {
      res.status(201).json({
        message: "product created successfully",
        product: result,
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
exports.updateProduct = (req, res, next) => {
  product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "product not found",
        });
      }
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "product updated successfully",
        product: result,
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
exports.deleteProduct = (req, res, next) => {
  product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({
          message: "product not found",
        });
      }
      res.status(200).json({
        message: "product deleted successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
