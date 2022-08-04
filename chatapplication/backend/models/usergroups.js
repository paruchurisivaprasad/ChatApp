const sequelize = require("./database");
const Sequelize = require("sequelize");

const Usergroup = sequelize.define("usergroup", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  groupname:{
    type:Sequelize.STRING,
    allowNull:false
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Usergroup;
