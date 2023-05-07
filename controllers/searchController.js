const { searchTrips } = require("./tripController");
const { searchUser } = require("./userController");

exports.searchAll = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!req.params.type) {
      const users = await searchUser(query);
      const trips = await searchTrips(query);
      res.json({ success: true, data: { users, trips } });
    }
    if (req.params.type === "user") {
      const user = await searchUser(query);
      res.json({ success: true, data: user });
    } else if (req.params.type === "trip") {
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
