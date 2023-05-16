const sequelize = require("../config/db");
const TripPlace = require("../models/TripPlace")(sequelize);
const Trip = require("../models/Trip")(sequelize);

// create a new tripplace
exports.createTripPlace = async (req, res) => {
  try {
    const tripPlace = await TripPlace.create(req.body);
    res.status(201).json({ success: true, tripPlace });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, message: "Failed to create tripPlace" });
  }
};

// get all tripplaces
exports.getTripPlaces = async (req, res) => {
  try {
    const tripPlaces = await TripPlace.findAll();
    res.status(200).json({ success: true, tripPlaces });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get tripPlaces" });
  }
};

// get all tripplaces by user id
exports.getUserTripPlaces = async (req, res) => {
  try {
    const tripPlaces = await TripPlace.findAll({

      include: [
        {
          model: Trip,
          where: { user_id: req.user.id },
        },
      ],
    });
    res.status(200).json({ success: true, tripPlaces });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get tripPlaces" });
  }
};

// get a single tripplace by id
exports.getTripPlaceById = async (req, res) => {
  try {
    const tripPlace = await TripPlace.findByPk(req.params.id);
    if (!tripPlace) {
      return res
        .status(404)
        .json({ success: false, message: "TripPlace not found" });
    }
    res.status(200).json({ success: true, tripPlace });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get tripPlace" });
  }
};

// update a tripplace by id
exports.updateTripPlace = async (req, res) => {
  try {
    const tripPlace = await TripPlace.findByPk(req.params.id);
    if (!tripPlace) {
      return res
        .status(404)
        .json({ success: false, message: "TripPlace not found" });
    }
    await tripPlace.update(req.body);
    res.status(200).json({ success: true, tripPlace });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, message: "Failed to update tripPlace" });
  }
};

// delete a tripplace by id
exports.deleteTripPlace = async (req, res) => {
  try {
    const tripPlace = await TripPlace.findByPk(req.params.id);
    if (!tripPlace) {
      return res
        .status(404)
        .json({ success: false, message: "TripPlace not found" });
    }
    await tripPlace.destroy();
    res
      .status(200)
      .json({ success: true, message: "TripPlace deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete tripPlace" });
  }
};
