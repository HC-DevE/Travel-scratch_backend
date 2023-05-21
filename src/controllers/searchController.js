const { Op } = require("sequelize");
const sequelize = require("../config/db");
const { searchTrips } = require("./tripController");
const { searchUser } = require("./userController");
const Trip = require("../models/Trip")(sequelize);
const User = require("../models/User")(sequelize);
// const Comment = require("../models/Comment")(sequelize);
// const Like = require("../models/Like")(sequelize);
const Post = require("../models/Post")(sequelize);
const Place = require("../models/Place")(sequelize);
const Media = require("../models/Media")(sequelize);
const Group = require("../models/Group")(sequelize);
const GroupMember = require("../models/GroupMember")(sequelize);
const Review = require("../models/Review")(sequelize);
const Friendship = require("../models/Friendship")(sequelize);
const TripPlace = require("../models/TripPlace")(sequelize);

exports.searchAll = async (req, res, next) => {
  try {
    const { query, type } = req.query;
    if (!type) {
      const users = await searchUser(query);
      const trips = await searchTrips(query);
      res.json({ success: true, data: { users, trips } });
    }
    if (type === "user") {
      const user = await searchUser(query);
      res.json({ success: true, data: user });
    } else if (type === "trip") {
      const trip = await searchTrips(query);
      res.json({ success: true, data: trip });
    }
  } catch (error) {
    next(error);
  }
};

//search only user
exports.searchUser = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await searchUser(query);
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//search only trip
exports.searchTrips = async (req, res) => {
  try {
    const { query } = req.query;
    const trips = await searchTrips(query);
    res.status(200).json({ success: true, data: trips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//testing gathering multiple search possible in the app
//TODO: see priveleges
exports.search = async (req, res) => {
  const { query } = req.query;
  console.log(query);

  try {
    // Perform search across multiple entities using Sequelize queries

    const [trips, posts, users, places, medias] = await Promise.all([
      Trip.findAll({
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
      }),
      Post.findAll({
        where: {
          [Op.or]: {
            title: {
              [Op.like]: `%${query}%`,
            },
            content: {
              [Op.like]: `%${query}%`,
            },
          },
        },
      }),
      User.findAll({
        where: {
          [Op.or]: {
            first_name: {
              [Op.like]: `%${query}%`,
            },
            last_name: {
              [Op.like]: `%${query}%`,
            },
            email: {
              [Op.like]: `%${query}%`,
            },
          },
        },
      }),
      Place.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${query}%`,
            },
            description: {
              [Op.like]: `%${query}%`,
            },
          },
        },
      }),
      Media.findAll({
        where: {
          [Op.or]: {
            description: {
              [Op.like]: `%${query}%`,
            },
          },
        },
      }),
    ]);
    // console.log([trips]);

    const searchResults = {
      trips,
      posts,
      users,
      places,
      medias,
    };

    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
