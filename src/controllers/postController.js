const sequelize = require("../config/db");
const Post = require("../models/Post")(sequelize);
const postService = require("../services/postService");

//TODO: sanitize and validation
exports.createPost = async (req, res, next) => {
  try {
    //TODO: add validationResult
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }

    const userId = req.user.id; //need to be unifrom everywhere
    const tripId = req.params.tripId;
    const { content, title } = req.body;
    const postType = tripId ? "trip" : "other";

    // Check if the post type is valid
    if (postType === "trip" && !!tripId) {
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

//get user posts by id
exports.getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.user; //better alternative to userId = req.user.id
    const { type } = req.query; //for filtering
    const posts = await Post.findAll({
      where: { user_id: id, type: type ?? ["other", "trip"] },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

//post by id
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//TODO à revoir côté métier
exports.getTripPostsById = async (req, res, next) => {
  const { Trip } = require("../models/associations")(sequelize);
  try {
    const { tripId } = req.params.tripId;
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

//checked
exports.getFriendsPostsById = async (req, res) => {
  try {
    const { friendId } = req.params;
    const { type } = req.query;
    const posts = await postService.getPostsByFriends(friendId, type);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update
exports.updatePost = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { id } = req.params;
    const { content, title, type } = req.body;
    const post = await Post.findByPk(id);
    if (post.user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.update({ content, title, type: type ?? post.type });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//delete
exports.deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (post.user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await post.destroy();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
