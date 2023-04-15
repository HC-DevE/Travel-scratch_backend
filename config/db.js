const { Sequelize } = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize("travel_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
