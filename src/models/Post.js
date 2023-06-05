const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Post extends Model {}
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      
      content: {
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["trip", "other"],
        allowNull: false,
        defaultValue: "trip",
      },
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Trip",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: false,
      underscored: true,
    }
  );
  return Post;
};
