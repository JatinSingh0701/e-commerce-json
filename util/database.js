const Sequelize = require("sequelize");

const sequelize = new Sequelize("e-commerce", "root", "0123456789", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
