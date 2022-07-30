const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "chatapp",
  "root",
  "paruchurisivaprasad",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
