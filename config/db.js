// /config/db.js
const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
const initAssociations = require("../models/associations");

const sequelize = new Sequelize("test_v3", "root", "", {
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

initAssociations(sequelize); // Passez l'instance sequelize à la fonction initAssociations

sequelize
.sync()
.then(() => console.log("Tables created successfully"))
.catch((err) => console.log("Error syncing tables:", err));

module.exports = sequelize;
