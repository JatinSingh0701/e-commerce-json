const express = require("express");
const categoryRoutes = require("./routes/category.routes");
const prodcutRouter = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const order = require("./models/order.model");
const Product = require("./models/product.model");
const user = require("./models/user.model");

const app = express();

app.use(express.json());

app.use(categoryRoutes);
app.use(prodcutRouter);
app.use(authRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

Product.belongsToMany(user, { through: order });

module.exports = app;
