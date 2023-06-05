const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class TripPlace extends Model {}
  TripPlace.init(
    {
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      visit_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TripPlace",
      tableName: "trip_places",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "trip_id" }, { name: "place_id" }],
        },
        {
          name: "fk_trip_places_trip_id",
          using: "BTREE",
          fields: [{ name: "trip_id" }],
        },
        {
          name: "fk_trip_places_place_id",
          using: "BTREE",
          fields: [{ name: "place_id" }],
        },
      ],
      id: false,
    }
  );

  return TripPlace;
};
