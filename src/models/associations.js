// /models/associations.js

// Export a function to initialize associations
module.exports = (sequelize) => {
  const User = require("./User")(sequelize);
  const Friendship = require("./Friendship")(sequelize);
  const Trip = require("./Trip")(sequelize);
  const Place = require("./Place")(sequelize);
  const TripPlace = require("./TripPlace")(sequelize);
  const Media = require("./Media")(sequelize);
  const Group = require("./Group")(sequelize);
  const GroupMember = require("./GroupMember")(sequelize);
  const Review = require("./Review")(sequelize);
  const Post = require("./Post")(sequelize);
  // const Comment = require("./Comment")(sequelize);
  // const Like = require("./Like")(sequelize);

  // Relations User - Friendship
  User.belongsToMany(User, { as: "Friends", through: Friendship });
  // User.belongsToMany(User, {through: Friendship,as: "Friends",foreignKey: "user_id"});

  // Relations User - Trip
  User.hasMany(Trip, { foreignKey: "user_id" });
  Trip.belongsTo(User, { foreignKey: "user_id" });

  // Relations Trip - Post
  Trip.hasMany(Post, { foreignKey: "trip_id" });
  Post.belongsTo(Trip, { foreignKey: "trip_id" });

  // Relations Trip - Place - TripPlace
  Trip.belongsToMany(Place, {
    through: TripPlace,
    foreignKey: "trip_id",
  });

  Place.belongsToMany(Trip, {
    through: TripPlace,
    foreignKey: "place_id",
  });

  // Relations Trip - Media
  Trip.hasMany(Media, { foreignKey: "trip_id" });
  Media.belongsTo(Trip, { foreignKey: "trip_id" });

  // Relations User - Group - GroupMember
  //users
  User.hasMany(Group, { foreignKey: "created_by" });
  User.belongsToMany(Group, {
    through: GroupMember,
    foreignKey: "user_id",
  });
  // Group to User association
  Group.belongsTo(User, { foreignKey: "created_by" });
  Group.belongsToMany(User, {
    through: GroupMember,
    foreignKey: "group_id",
  });

  // Relations Group - Trip
  Group.hasOne(Trip, { foreignKey: "group_id" });
  Trip.belongsTo(Group, { foreignKey: "trip_id" });

  // Relations User - Review - Place
  User.hasMany(Review, { foreignKey: "user_id" });
  Review.belongsTo(User, { foreignKey: "user_id" });
  Place.hasMany(Review, { foreignKey: "place_id" });
  Review.belongsTo(Place, { foreignKey: "place_id" });

  // Relations User - Post
  User.hasMany(Post, { foreignKey: "user_id" });
  Post.belongsTo(User, { foreignKey: "user_id" });

  // Relations User - Media
  User.hasMany(Media, { foreignKey: "user_id" });
  Media.belongsTo(User, { foreignKey: "user_id" });

  // Relations Post - Media
  Post.hasMany(Media, { foreignKey: "post_id" });
  Media.belongsTo(Post, { foreignKey: "post_id" });

  // Relations User - Comment - Post
  // User.hasMany(Comment, { foreignKey: "user_id" });
  // Comment.belongsTo(User, { foreignKey: "user_id" });
  // Post.hasMany(Comment, { foreignKey: "post_id" });
  // Comment.belongsTo(Post, { foreignKey: "post_id" });

  // Relations User - Like - Post
  // User.belongsToMany(Post, { through: Like });
  // Post.belongsToMany(User, { through: Like });

  console.log("Associations initialized");

  return {
    User,
    Friendship,
    Trip,
    Place,
    Media,
    Group,
    Review,
    Post,
    GroupMember,
    TripPlace,
    // Comment,
    // Like,
  };
};
