const sequelize = require("../config/db");
const Trip = require("../models/Trip")(sequelize);
const Post = require("../models/Post")(sequelize);

exports.createTripPost = async (req, res, next) => {
  console.log(req.body);
  try {
    const { tripId } = req.params;
    const { type, content, title } = req.body;

    const post = await Post.create({
      type,
      content,
      title,
      trip_id: tripId,
      user_id: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getTripPosts = async (req, res, next) => {
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
