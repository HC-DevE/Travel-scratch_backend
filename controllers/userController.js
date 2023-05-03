const sequelize = require("../config/db");
const User = require("../models/User")(sequelize);

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //remove password from user
    const { password_hash, ...rest } = Object.assign({}, user.get());
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await user.update(req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//just for testing the route without being logged in 
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    //remove password_hash from the users
    const usersWithoutPassword = users.map((user) => {
      const { password_hash, ...rest } = Object.assign({}, user.get());
      return rest;
    });
    res.status(200).json(usersWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
