// associations.js
const User = require("./models/User");
const Trip = require("./models/Trip");
const Place = require("./models/Place");
const Review = require("./models/Review");
const Friendship = require("./models/Friendship");
const Post = require("./models/Post");
// const TripPhoto = require('./models/TripPhoto');
// const TripGroup = require('./models/TripGroup');

// Define relationships between models
// 1. User (1) --- (0..*) creates --- (0..*) Trip
User.hasMany(Trip, { foreignKey: "user_id", onDelete: "CASCADE" });
Trip.belongsTo(User, { foreignKey: "user_id" });

// 2. User (1) --- (0..*) sends --- (0..*) Friendship
User.hasMany(Friendship, { foreignKey: "user_id", onDelete: "CASCADE" });
Friendship.belongsTo(User, { foreignKey: "user_id" });

// 3. User (1) --- (0..*) receives --- (0..*) Friendship
User.hasMany(Friendship, { foreignKey: "friend_id", onDelete: "CASCADE" });
Friendship.belongsTo(User, { foreignKey: "friend_id" });

// 4. User (1) --- (0..*) writes --- (0..*) Review
User.hasMany(Review, { foreignKey: "user_id", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "user_id" });

// 5. Place (1) --- (0..*) has --- (0..*) Review
Place.hasMany(Review, { foreignKey: "place_id", onDelete: "CASCADE" });
Review.belongsTo(Place, { foreignKey: "place_id" });

// 6. User (1) --- (0..*) writes --- (0..*) Post
User.hasMany(Post, { foreignKey: "user_id", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "user_id" });

// 7. Trip (1) --- (0..*) has --- (0..*) Place
Trip.hasMany(Place, { foreignKey: "trip_id", onDelete: "CASCADE" });
Place.belongsTo(Trip, { foreignKey: "trip_id" });


// 6. Trip (1) --- (0..*) contains --- (0..*) Trip_Photo
// Trip.hasMany(TripPhoto, { foreignKey: "trip_id", onDelete: "CASCADE" });
// TripPhoto.belongsTo(Trip, { foreignKey: "trip_id" });

// 7. User (1) --- (0..*) member_of --- (0..*) Trip_Group (M:N)
// 8. Trip (1) --- (0..*) associated_with --- (0..*) Trip_Group (M:N)
// const UserTripGroup = require("./models/UserTripGroup");
// User.belongsToMany(TripGroup, {
//   through: UserTripGroup,
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });
// TripGroup.belongsToMany(User, {
//   through: UserTripGroup,
//   foreignKey: "trip_group_id",
//   onDelete: "CASCADE",
// });

// Trip.belongsToMany(TripGroup, {
//   through: UserTripGroup,
//   foreignKey: "trip_id",
//   onDelete: "CASCADE",
// });
// TripGroup.belongsToMany(Trip, {
//   through: UserTripGroup,
//   foreignKey: "trip_group_id",
//   onDelete: "CASCADE",
// });

// Export a function to initialize associations
module.exports = () => {
  console.log("Associations initialized");
};
