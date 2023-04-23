const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Place extends Model {}
  Place.init({
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
        // type: DataTypes.POINT,
      type: DataTypes.GEOGRAPHY,
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
  }, {
    sequelize,
    tableName: "places",
    modelName: "Place",
    timestamps: false,
    });
    Place.associate = (models) => {
        Place.belongsToMany(models.Trip, {
            through: models.TripPlace,
            foreignKey: "place_id",
        });
    }
    Place.associate = (models) => {
        Place.hasMany(models.TripPlace, {
            foreignKey: "place_id",
        });
    }
  return Place;
};
