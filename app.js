const express = require("express");
const bodyParser = require("body-parser");
const categoryRoutes = require("./routes/category.routes");
const productRouter = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const order = require("./models/order.model");
const Product = require("./models/product.model");
const user = require("./models/user.model");
const Category = require("./models/categrory.model"); 
const app = express();

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use(categoryRoutes);
app.use(productRouter);
app.use(authRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

Product.belongsToMany(user, { through: order });
Category.hasMany(Product);

const sequelize = require("./util/database");
const { ExpressValidator } = require("express-validator");

sequelize
  .sync() //{ force: true }
  .then((result) => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
