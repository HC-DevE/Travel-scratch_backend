// /models/associations.js

// Export a function to initialize associations
module.exports = (sequelize) => {
  const User = require("./User")(sequelize);
  const Friendship = require("./Friendship")(sequelize);
  const Trip = require("./Trip")(sequelize);
  // const Place = require("./Place")(sequelize);
  // const TripPlace = require("./TripPlace")(sequelize);
  // const Photo = require("./Photo")(sequelize);
  // const Group = require("./Group")(sequelize);
  // const GroupMember = require("./GroupMember")(sequelize);
  // const Review = require("./Review")(sequelize);
  // const Post = require("./Post")(sequelize);
  // const Comment = require("./Comment")(sequelize);
  // const Like = require("./Like")(sequelize);
  // Relations User - Friendship
  User.belongsToMany(User, { as: "Friends", through: Friendship });

  // Relations User - Trip
  User.hasMany(Trip, { foreignKey: "user_id" });
  Trip.belongsTo(User, { foreignKey: "user_id" });

  // Relations Trip - Place - TripPlace
  // Trip.belongsToMany(Place, { through: TripPlace });
  // Place.belongsToMany(Trip, { through: TripPlace });

  // Relations Trip - Photo
  // Trip.hasMany(Photo, { foreignKey: "trip_id" });
  // Photo.belongsTo(Trip, { foreignKey: "trip_id" });

  // Relations User - Group - GroupMember
  // User.belongsToMany(Group, { through: GroupMember });
  // Group.belongsToMany(User, { through: GroupMember });

  // Relations User - Review - Place
  // User.hasMany(Review, { foreignKey: "user_id" });
  // Review.belongsTo(User, { foreignKey: "user_id" });
  // Place.hasMany(Review, { foreignKey: "place_id" });
  // Review.belongsTo(Place, { foreignKey: "place_id" });

  // Relations User - Post
  // User.hasMany(Post, { foreignKey: "user_id" });
  // Post.belongsTo(User, { foreignKey: "user_id" });

  // Relations User - Comment - Post
  // User.hasMany(Comment, { foreignKey: "user_id" });
  // Comment.belongsTo(User, { foreignKey: "user_id" });
  // Post.hasMany(Comment, { foreignKey: "post_id" });
  // Comment.belongsTo(Post, { foreignKey: "post_id" });

  // Relations User - Like - Post
  // User.belongsToMany(Post, { through: Like });
  // Post.belongsToMany(User, { through: Like });

  console.log("Associations initialized");
};
