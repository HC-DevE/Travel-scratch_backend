// /config/db.js
const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
const initAssociations = require("../models/associations");
require("dotenv").config();

//localhost database connection
const sequelize = new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USERNAME, process.env.LOCAL_DB_PSSWD, {
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

//Passez l'instance sequelize à la fonction initAssociations
initAssociations(sequelize); 

sequelize
.sync()
.then(() => console.log("Tables created successfully"))
.catch((err) => console.log("Error syncing tables:", err));

module.exports = sequelize;


//testing distant db connection
// const express = require('express');
// const cors = require("cors");
// const Sequelize = require('sequelize');
// const mysql = require('mysql2');
// const app = express();
// require("dotenv").config();

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const sequelize = new Sequelize(process.env.db_name,process.env.username,process.env.password, {
//   host: process.env.distant_localhost,
//   dialect: 'mysql',
//   // dialectOptions: {
//   //   ssl: 'Amazon RDS',
//   // },
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });
// const User = require('../models/User')(sequelize);

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

// app.get('/api/users', async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// app.use((error, req, res, next) => {
//   console.error(error);
//   res.status(500).send('Internal server error');
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });




