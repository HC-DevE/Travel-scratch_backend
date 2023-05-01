//review controller

const sequelize = require("../config/db");

const Review = require("../models/Review")(sequelize);
const Place = require("../models/Place")(sequelize);
const User = require("../models/User")(sequelize);

//get all reviews
exports.getAllReviews = async (req, res, next) => {
  const { Review } = require("../models/associations")(sequelize);
  try {
    // const place = await Place.findByPk(req.params.id);

    // if (!place) {
    //   return next(`Place not found with id of ${req.params.id}`, 404);
    // }

    const reviews = await Review.findAll({
      //   where: { placeId: place.id },
      include: [User, Place],
    });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

//get review by id

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

//create review

exports.createReview = async (req, res) => {
  // Check if the required review data is present
  if (!req.body.rating || !req.body.comment || !req.params.placeId) {
    return res
      .status(400)
      .json({ error: "Rating, comment, and placeId are required" });
  }

  // Get the user from the request
  const user = req.user;

  // Check if the place exists
  const place = await Place.findByPk(req.params.placeId);
  if (!place) {
    return res.status(404).json({ error: "Place not found" });
  }

  // Create a new review
  const review = await Review.create({
    rating: req.body.rating,
    comment: req.body.comment,
    userId: user.id,
    placeId: place.id,
  });

  res.status(201).json({ message: "Review created successfully", review });
};

//update review

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
      );
    }
    await review.update(req.body);
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

//delete review

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
      );
    }
    await review.destroy();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

//get user reviews

exports.getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ where: { user_id: req.user.id } });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};
