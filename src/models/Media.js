const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Media extends Model {}

  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Trip",
          key: "id",
        },
      },
      place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Place",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("photo", "video"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Media",
      tableName: "medias",
      timestamps: false,
    }
  );
  return Media;
};

//update coming soon to get ride of the sequelize parameter everywhere

// const { DataTypes, Model } = require("sequelize");
// const sequelize = require("../config/db");

// class Media extends Model {}

// Media.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "User",
//         key: "id",
//       },
//     },
//     trip_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Trip",
//         key: "id",
//       },
//     },
//     place_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Place",
//         key: "id",
//       },
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     url: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//       allowNull: false,
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "media",
//     tableName: "medias",
//   }
// );

// module.exports = Media;
