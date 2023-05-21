//tripController.js checked !
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
      user_id: user.id,
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

  // Define pagination parameters
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

  // Calculate the offset
  const offset = (page - 1) * limit;

  try {
    // Get the user's trips with pagination
    const { count, rows: trips } = await Trip.findAndCountAll({
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
      limit,
      offset,
    });

    if (trips.length === 0) {
      return res.status(404).json({ error: "No trips found" });
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({ trips, totalPages, currentPage: page });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user trips" });
  }
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
    const tripId = req.params.tripId;
    const userId = req.user.id;
    const trip = await Trip.findByPk(tripId);
    //check if the trip belongs to the user
    if (trip.user_id !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get friend trips
exports.getFriendTrips = async (req, res) => {
  const { Trip, Friendship } = require("../models/associations")(sequelize);
  // Define pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  // Calculate the offset
  const offset = (page - 1) * limit;
  try {
    const userId = req.user.id;
    const { friendId } = req.params;

    //check if the user is a friend
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [{ user_id: userId }, { friend_id: userId }],
        status: "accepted",
      },
    });
    if (!friendship) {
      return res
        .status(404)
        .json({ error: "You are not friend with this user" });
    }
    //get the trips
    const { count, rows: trips } = await Trip.findAndCountAll({
      where: { user_id: friendId },
      include: [
        {
          model: Place,
          through: {
            attributes: [],
          },
        },
      ],
      limit,
      offset,
    });

    if (trips.length === 0) {
      return res.status(404).json({ error: "No trips found" });
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({ trips, totalPages, currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update trip
exports.updateTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.user.id;
    const trip = await Trip.findByPk(tripId);
    //check if the trip belongs to the user
    if (trip.user_id !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    //update the trip
    const updatedTrip = await trip.update(req.body);
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.user.id;
    const trip = await Trip.findByPk(tripId);
    //check if the trip belongs to the user
    if (trip.user_id !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    //delete the trip
    await trip.destroy();
    res.status(200).json({ success: true });
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
        [Op.or]: {
          title: {
            [Op.like]: `%${query}%`,
          },
          description: {
            [Op.like]: `%${query}%`,
          },
        },
      },
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
//           { title: { [Op.like]: `%${query}%` } },
//           { description: { [Op.like]: `%${query}%` } },
//           { category: { [Op.like]: `%${query}%` } }, //TODO: implement categories
//         ],
//       },
//       attributes: ["id", "title", "description", "category", "created_at"],
//     });
//     res.json({ success: true, data: trips });
//   } catch (error) {
//     next(error);
//   }
// };

// exemple of caching for getFriendTrips
// exports.getFriendTrips = async (req, res) => {
//   const { Trip, Friendship } = require("../models/associations")(sequelize);
// const sanitize = require("sanitize-html");

// // Validate and sanitize req.params
// const { friendId } = req.params;
// if (!friendId || !Number.isInteger(parseInt(friendId))) {
//   return res.status(400).json({ error: "Invalid friend ID" });
// }
// const sanitizedFriendId = sanitize(friendId);

// // Validate and sanitize req.query
// const page = parseInt(req.query.page) || 1;
// if (!Number.isInteger(page) || page < 1) {
//   return res.status(400).json({ error: "Invalid page number" });
// }
// const limit = parseInt(req.query.limit) || 10;
// if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
//   return res.status(400).json({ error: "Invalid limit value" });
// }
//   // Define pagination parameters
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   // Calculate the offset
//   const offset = (page - 1) * limit;
//   try {
//     const userId = req.user.id;

//     //check if the user is a friend
//     const friendship = await Friendship.findOne({
//       where: {
//         [Op.or]: [{ user_id: userId }, { friend_id: userId }],
//         status: "accepted",
//       },
//     });
//     if (!friendship) {
//       return res
//         .status(404)
//         .json({ error: "You are not friend with this user" });
//     }
//     //get the trips
//     const { count, rows: trips } = await Trip.findAndCountAll({
//       where: { user_id: friendId },
//       include: [
//         {
//           model: Place,
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//       limit,
//       offset,
//     });
//     // Calculate the total number of pages
//     const totalPages = Math.ceil(count / limit);
//     // Define the pagination meta
//     const pagination = {
//       currentPage: page,
//       totalPages,
//       nextPage: page + 1 <= totalPages ? page + 1 : null,
//       prevPage: page - 1 >= 1 ? page - 1 : null,
//     };
//     // Define the response body
//     const responseBody = {
//       success: true,
//       data: trips,
//       pagination,
//     };
//     // Define the cache key
//     const cacheKey = `getFriendTrips:${userId}:${page}:${limit}`;
//     // Set the response in the cache
//     client.setex(cacheKey, 3600, JSON.stringify(responseBody));
//     // Send the response
//     res.status(200).json(responseBody);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

//caching using redis
// const redis = require("redis");
// const { promisify } = require("util");
// const client = redis.createClient();

// // Promisify Redis functions
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);

// exports.getFriendTrips = async (req, res) => {
//   const { Trip, Friendship } = require("../models/associations")(sequelize);
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = (page - 1) * limit;
//   try {
//     const userId = req.user.id;
//     const { friendId } = req.params;

//     // Check if the user is a friend in the cache
//     const cacheKey = `friendship:${userId}:${friendId}`;
//     const friendship = await getAsync(cacheKey);

//     if (friendship) {
//       // If friendship exists in the cache, use it
//       if (friendship !== "accepted") {
//         return res.status(404).json({ error: "You are not friend with this user" });
//       }
//     } else {
//       // If friendship doesn't exist in the cache, query the database
//       const dbFriendship = await Friendship.findOne({
//         where: {
//           [Op.or]: [{ user_id: userId }, { friend_id: userId }],
//           status: "accepted",
//         },
//       });

//       if (!dbFriendship) {
//         return res.status(404).json({ error: "You are not friend with this user" });
//       }

//       // Store the friendship in the cache
//       await setAsync(cacheKey, "accepted");
//     }

//     // Check if the trips exist in the cache
//     const cacheKeyTrips = `trips:${friendId}:${page}`;
//     const cachedTrips = await getAsync(cacheKeyTrips);

//     if (cachedTrips) {
//       // If trips exist in the cache, use them
//       const parsedTrips = JSON.parse(cachedTrips);
//       const totalPages = Math.ceil(parsedTrips.count / limit);

//       return res.status(200).json({
//         trips: parsedTrips.trips,
//         totalPages,
//         currentPage: page,
//       });
//     }

//     // If trips don't exist in the cache, query the database
//     const { count, rows: trips } = await Trip.findAndCountAll({
//       where: { user_id: friendId },
//       include: [
//         {
//           model: Place,
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//       limit,
//       offset,
//     });

//     if (trips.length === 0) {
//       return res.status(404).json({ error: "No trips found" });
//     }

//     // Store the trips in the cache
//     await setAsync(cacheKeyTrips, JSON.stringify({ count, trips }));

//     // Calculate the total number of pages
//     const totalPages = Math.ceil(count / limit);

//     res.status(200).json({ trips, totalPages, currentPage: page });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
