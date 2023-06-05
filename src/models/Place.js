const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Place extends Model {}
  Place.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
        unique: "latitude_longitude",
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        unique: "latitude_longitude",
      },
      country: {
        type: DataTypes.STRING,
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
      modelName: "Place",
      tableName: "places",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["latitude", "longitude"],
        },
      ],
    }
  );
  return Place;
};
