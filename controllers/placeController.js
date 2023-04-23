
const sequelize = require("../config/db");
const Place = require("../models/Place")(sequelize);

//create place

exports.createPlace = async (req, res, next) => {
  const place = await Place.create(req.body);
  res.status(201).json({
    success: true,
    data: place,
  });
};

//get all places

exports.getAllPlaces = async (req, res, next) => {
  const places = await Place.findAll();
  res.status(200).json({
    success: true,
    data: places,
  });
};

//get single place

exports.getPlaceById = async (req, res, next) => {
  const place = await Place.findByPk(req.params.id);
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
  const places = await Place.findAll({ where: { user_id: req.user.id } });
  res.status(200).json({
    success: true,
    data: places,
  });
};

//get user place

exports.getUserPlace = async (req, res, next) => {
  const place = await Place.findOne({
    where: { user_id: req.user.id, id: req.params.id },
  });
  if (!place) {
    return next(
      new ErrorResponse(
        `Place not found with id of ${req.params.id} for user ${req.user.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: place,
  });
};
