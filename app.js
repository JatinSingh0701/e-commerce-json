const express = require("express");

const categoryRoutes = require("./routes/category.routes");
const prodcutRouter = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const sequelize = require("./util/database");

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

sequelize
  .sync()
  .then((result) => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
