const sequelize = require("../config/db");
const Group = require("../models/Group")(sequelize);
const Trip = require("../models/Trip")(sequelize);
const Place = require("../models/Place")(sequelize);
const Post = require("../models/Post")(sequelize);
const User = require("../models/User")(sequelize);

exports.checkUserAccessPlace = async function (userId, placeId) {
  try {
    // check if the user has access to the place
    const place = await Place.findOne({
      where: {
        id: placeId,
        user_id: userId,
      },
    });
    return !!place;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user access to place");
  }
};

exports.checkUserAccessTrip = async function (userId, tripId) {
  try {
    //check if the user has access to the trip
    const trip = await Trip.findOne({
      where: {
        id: tripId,
        user_id: userId,
      },
    });
    return !!trip;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user access to trip");
  }
};

exports.checkUserAccessPost = async function (userId, postId) {
  try {
    // check if the user has access to the post
    const post = await Post.findOne({
      where: {
        id: postId,
        user_id: userId,
      },
    });
    return !!post;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user access to post");
  }
};

exports.checkUserAccessGroup = async function (userId, groupId, tripId) {
  try {
    //check if the user belongs to a group
    const group = await Group.findOne({
      where: {
        id: groupId,
        created_by: userId,
        trip_id: tripId,
      },
    });
    return !!group;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user access to group");
  }
};
