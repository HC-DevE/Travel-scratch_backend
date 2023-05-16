// const { DataTypes, Model } = require("sequelize");

// module.exports = (sequelize) => {
    
//   class TripPlace extends Model {}
//   TripPlace.init(
//     {
//       trip_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Trip",
//           key: "id",
//         },
//       },
//       place_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Place",
//           key: "id",
//         },
//       },
//       created_at: {
//         type: DataTypes.DATE,
//         allowNull: false,

//         defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
//       },
//     },
//     {
//       sequelize,
//       tableName: "trip_places",
//       modelName: "TripPlace",
//       timestamps: false,
//     }
//   );

//   return TripPlace;
// };
