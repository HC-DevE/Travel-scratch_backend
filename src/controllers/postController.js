const sequelize = require("../config/db");
const Post = require("../models/Post")(sequelize);
const postService = require("../services/postService");

exports.createPost = async (req, res, next) => {
  try {
    //TODO: add validationResult
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }

    const userId = req.user.id;
    const tripId = req.params.tripId;
    const { content, title } = req.body;
    const postType = tripId ? "trip" : "other";

    // Check that the post type is valid
    if (postType === "trip" && !tripId) {
      return res
        .status(400)
        .json({ error: "A trip ID is required for trip posts" });
    }

    // Save the post record to the database
    const post = await postService.savePostToDatabase(
      userId,
      tripId,
      title,
      content,
      postType
    );

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  const { Trip } = require("../models/associations")(sequelize);
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const posts = await Post.findAll({
      where: { trip_id: tripId },
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getFriendsPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    const posts = await postService.getPostsByFriends(userId, type);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
