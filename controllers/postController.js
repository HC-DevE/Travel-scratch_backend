const sequelize = require('../config/db');
const Trip  = require('../models/Trip')(sequelize);
const Post  = require('../models/Post')(sequelize);

exports.createTripPost = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { type, content } = req.body;

    const post = await Post.create({
      type,
      content,
      trip_id: tripId,
      user_id: req.user.id, // Assuming you have authenticated users
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getTripPosts = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId, {
      include: {
        model: Post,
      },
    });

    res.json(trip.posts);
  } catch (error) {
    next(error);
  }
};
