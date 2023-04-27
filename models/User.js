const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

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
      tableName: "users",
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const User = sequelize.define(
//     "User",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       first_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       last_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password_hash: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       birth_date: {
//         type: DataTypes.DATE,
//       },
//       profile_picture: {
//         type: DataTypes.STRING,
//       },
//       created_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       updated_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       gender: {
//         type: DataTypes.ENUM("male", "female", "other"),
//       },
//       preferences: {
//         type: DataTypes.JSON,
//       },
//       last_known_latitude: {
//         type: DataTypes.DOUBLE,
//       },
//       last_known_longitude: {
//         type: DataTypes.DOUBLE,
//       },
//     },
//     {
//       timestamps: false,
//       tableName: "users",
//     }
//   );
//   return User;
// };
