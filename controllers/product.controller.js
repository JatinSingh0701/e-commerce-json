const Product = require("../models/product.model");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

// GET request
exports.getProducts = (req, res, next) => {
  let totalItems;
  let page = req.query.page;
  let limit = 5;
  let offset = (page - 1) * limit;

  let minCost = req.query.minCost;
  let maxCost = req.query.maxCost;

  if (!page) {
    Product.findAll()
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
    return; // Add return statement to exit the function
  }

  Product.findAll({
    where: {
      price: {
        [Op.gte]: minCost || Number.MIN_SAFE_INTEGER,
        [Op.lte]: maxCost || Number.MAX_SAFE_INTEGER,
      },
    },
    limit: limit,
    offset: offset,
  })
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

  Product.count().then((count) => {
    totalItems = count;
  });
};

exports.getProduct = (req, res, next) => {
  Product.findOne({
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
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(422).json({
      message: "Name cannot be empty",
    });
  }

  Product.create({
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
  Product.findOne({
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
  Product.destroy({
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
