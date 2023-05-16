const sequelize = require("../config/db");
const User = require("../models/User");
const Place = require("../models/Place")(sequelize);
const Review = require("../models/Review")(sequelize);

//create place

exports.createPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json({
      success: true,
      data: place,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({
        success: false,
        error: "A place with the same coordinates already exists",
      });
    } else {
      next(error);
    }
  }
};

//get all places

exports.getAllPlaces = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const places = await Place.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "longitude",
        "latitude",
        "location",
        "created_at",
        "updated_at",
      ],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

//get single place

exports.getPlaceById = async (req, res, next) => {
  // const {
  //   models: { Review },
  // } = sequelize;
  const { Place } = require("../models/associations")(sequelize);
  const place = await Place.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Review,
        model: User,
      },
    ],
  });
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: place,
  });
};

//update place

exports.updatePlace = async (req, res, next) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  await place.update(req.body);
  res.status(200).json({
    success: true,
    data: place,
  });
};

//delete place

exports.deletePlace = async (req, res, next) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  await place.destroy();
  res.status(200).json({
    success: true,
    data: {},
  });
};

//get user places

exports.getUserPlaces = async (req, res, next) => {
  try {
    const places = await Place.findAll({ where: { user_id: req.user.id } });
    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

//get user place

exports.getUserPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { user_id: req.user.id, id: req.params.id },
    });
    if (!place) {
      return res.status(404).json({
        success: false,
        error: "Place not found",
      });
    }
    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    next(error);
  };
}
