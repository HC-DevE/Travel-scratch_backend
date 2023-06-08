const sequelize = require("../config/db");
const User = require("../models/User")(sequelize);
const Post = require("../models/Post")(sequelize);
const { Op } = require("sequelize");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//get friend profile
exports.getFriendProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password_hash"] },
    });
    const friend = user.getFriendships({ //TODO: update later
      where: {
        [Op.or]: [
          { user_id: req.user.id, friend_id: req.params.id },
          { user_id: req.params.id, friend_id: req.user.id },
        ],
      },
    });
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.status(200).json(friend);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Check that the authenticated user matches the requested user
    if (user.id !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to perform this action",
      });
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
  const { User } = require("../models/associations")(sequelize);
  try {
    const users = await User.findAll({
      include: [
        {
          model: Post,
        },
      ],
      attributes: { exclude: ["password_hash"] },
    });

    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// search users by name or email
exports.searchUser = async (query) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${query}%` } },
          { last_name: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
        ],
      },
      attributes: ["id", "first_name", "last_name", "email", "profile_picture"],
    });
    // res.status(200).json(users);
    return users;
  } catch (error) {
    next(error);
  }
};
