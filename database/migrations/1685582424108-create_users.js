const { Sequelize, DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
        length: 255,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(50),
        length: 255,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        length: 255,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.DataTypes.STRING(255),
        length: 255,
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      profile_picture: {
        type: Sequelize.DataTypes.STRING(255),
        length: 255,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      gender: {
        type: Sequelize.DataTypes.ENUM("male", "female", "other"),
      },
      last_known_latitude: {
        type: Sequelize.DataTypes.DOUBLE,
      },
      last_known_longitude: {
        type: Sequelize.DataTypes.DOUBLE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
