const { DataTypes, Model } = require("sequelize");
const sequelize = require("sequelize");
const Group = require("./Group");

module.exports = (sequelize) => {
  class User extends Model {
    getFullname() {
      return [this.first_name, this.last_name].join(" ");
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Must be a valid email address" },
        }
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
      },
      preferences: {
        type: DataTypes.JSON,
      },
      last_known_latitude: {
        type: DataTypes.DOUBLE,
      },
      last_known_longitude: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
      underscored: true,
    }

  );
  return User;
};
