const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Review extends Model {
    // static associate(models) {
    //   this.belongsTo(models.User, {
    //     foreignKey: "user_id",
    //   });
    //   this.belongsTo(models.Place, {
    //     foreignKey: "place_id",
    //   });
    // }
  }
  Review.init(
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
      place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Place",
          key: "id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
      timestamps: false,
      underscored: true,
    }
  );
  return Review;
};
