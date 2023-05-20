const { Op } = require("sequelize");
const sequelize = require("../config/db");

const Friendship = require("../models/Friendship")(sequelize);
const Post = require("../models/Post")(sequelize);
const User = require("../models/User")(sequelize);

exports.savePostToDatabase = async (
  userId,
  tripId,
  title,
  content,
  postType
) => {
  try {
    const post = await Post.create({
      user_id: userId,
      trip_id: tripId,
      title,
      content,
      type: postType,
    });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save post to database"); //à revoir
  }
};

//checked
exports.getPostsByFriends = async (userId, postType) => {
  const { Post } = require("../models/associations")(sequelize);
  try {
    const friends = await Friendship.findAll({
      where: {
        [Op.or]: [{ user_id: userId }, { friend_id: userId }],
        status: "accepted",
      },
    });

    const friendIds = friends.map((friend) => {
      return friend.friend_id != userId ? friend.friend_id : friend.user_id;
    });

    const posts = await Post.findAll({
      where: {
        user_id: {
          [Op.in]: friendIds,
        },
        type: postType ?? ["other", "trip"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "profile_picture"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get posts");
  }
};
