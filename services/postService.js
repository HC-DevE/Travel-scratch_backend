const sequelize = require("../config/db");
const Friendship = require("../models/Friendship")(sequelize);
const Post = require("../models/Post")(sequelize);

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
    throw new Error("Failed to save post to database");
  }
};

exports.getPostsByFriends = async (userId, postType) => {
  console.log("post type", postType);
  const { Post, User } = require("../models/associations")(sequelize);
  try {
    const friends = await User.findAll({
      where: {
        id: userId,
      },
      include: {
        model: User,
        as: "Friends",
        through: {
          where: {
            status: "accepted",
          },
        },
      },
    });
    const friendIds = friends.map((friend) => console.log(friend));
    // const friendIds = friends.map((friend) => friend.friend_id);

    const posts = await Post.findAll({
      where: {
        user_id: friendIds,
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
