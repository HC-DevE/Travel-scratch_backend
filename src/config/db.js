// /config/db.js
const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
const initAssociations = require("../models/associations");

//localhost database connection
const sequelize = new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USERNAME,
  process.env.LOCAL_DB_PSSWD,
  {
    host: process.env.LOCAL_DB_HOST,
    dialect: "mysql",
    dialectModule: mysql,
    // dialectOptions: {
      // ssl: {
      //   require: false,
      //   rejectUnauthorized: true, // Set this to `false` if using a self-signed certificate
      // },
    // },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true, // use snake_case column names in tables
    },
    logging: false, // disable logging of SQL queries
  }
);

//Passez l'instance sequelize à la fonction initAssociations
initAssociations(sequelize);

sequelize
  .sync()
  .then(() => console.log("Tables created successfully"))
  .catch((err) => console.log("Error syncing tables:", err));

module.exports = sequelize;
