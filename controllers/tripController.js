const sequelize = require("../config/db");
const Trip = require("../models/Trip")(sequelize);
const Place = require("../models/Place")(sequelize);
const User = require("../models/User")(sequelize);
const Media = require("../models/Media")(sequelize);
const { Op } = require("sequelize");

exports.createTrip = async (req, res) => {
  // check if ther is a title
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }
  // Get the user from the request
  const user = req.user;

  // Check if the trip already exists
  const tripExists = await Trip.findOne({
    where: {
      title: req.body.title,
      user_id: req.user.id,
    },
  });
  if (tripExists) {
    return res.status(400).json({ error: "Trip already exists" });
  }
  // Get the trip data from the request
  const { title, description, start_date, end_date } = req.body;
  // Create a new trip
  const trip = await Trip.create({
    title,
    description,
    start_date,
    end_date,
    user_id: user.id,
  });
  // Add the trip to the user's trips
  // user.addTrip(trip);
  res.status(201).json({ message: "Trip created successfully", trip: trip });
};

// Get all trips for a user
exports.getUserTrips = async (req, res) => {
  const { Trip } = require("../models/associations")(sequelize);

  // Get the user from the request
  const user = req.user;

  // Get the user's trips
  const trips = await Trip.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: Place,
        through: {
          attributes: [],
        },
      },
      {
        model: Media,
      },
    ],
  });

  if (!trips) {
    return res.status(404).json({ error: "No trips found" });
  }
  res.status(200).json(trips);
};

//testing all the trips for all users
exports.getAllTrips = async (req, res) => {
  const { Trip } = require("../models/associations")(sequelize);
  try {
    const trips = await Trip.findAll({
      include: [
        {
          model: Place,
          through: {
            attributes: [],
          },
        },
        // {
        //   model: User,
        //   attributes: ["id", "username", "email"],
        // },
        {
          model: Media,
        },
      ],
    });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get user trip using id
exports.getUserTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//search for trips
exports.searchTrips = async (query) => {
  const { Trip } = require("../models/associations")(sequelize);
  try {
    const trips = await Trip.findAll({
      where: {
        title: { [Op.like]: `%${query}%` },
      },
      include: [
        {
          model: Place,
          through: {
            attributes: [],
          },
        },
        {
          model: Media,
        },
      ],
    });
    // res.status(200).json({ success: true, data: trips });
    return trips;
  } catch (err) {
    // res.status(500).json({ error: err.message });
    return err;
  }
};

//alternative search trip methode

// exports.searchTrips = async (req, res, next) => {
//   try {
//     const { query } = req.query;
//     const trips = await Trip.findAll({
//       where: {
//         [Op.or]: [
//           { name: { [Op.like]: `%${query}%` } },
//           { description: { [Op.like]: `%${query}%` } },
//           { category: { [Op.like]: `%${query}%` } },
//         ],
//       },
//       attributes: ["id", "name", "description", "category", "created_at"],
//     });
//     res.json({ success: true, data: trips });
//   } catch (error) {
//     next(error);
//   }
// };
