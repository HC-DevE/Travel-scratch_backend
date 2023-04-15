const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  profile_picture: {
    type: DataTypes.STRING
  },
  // created_at: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: Sequelize.NOW
  // },
  // updated_at: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: Sequelize.NOW
  // },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preferences: {
    type: DataTypes.TEXT
  },
  last_known_latitude: {
    type: DataTypes.DOUBLE
  },
  last_known_longitude: {
    type: DataTypes.DOUBLE
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

module.exports = User;