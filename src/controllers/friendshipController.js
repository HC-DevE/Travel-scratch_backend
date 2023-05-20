// /controllers/friendshipController.js

const sequelize = require("../config/db");
const Friendship = require("../models/Friendship")(sequelize);

exports.createFriendship = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;

    if (user_id === friend_id) {
      return res
        .status(400)
        .json({ message: "You can't be friends with yourself" });
    }

    const existingFriendship = await Friendship.findOne(
      {
        where: {
          user_id,
          friend_id,
        },
      },
      {
        where: {
          user_id: friend_id,
          friend_id: user_id,
        },
      }
    );

    if (existingFriendship) {
      return res.status(400).json({ message: "Friendship already exists" });
    }

    const newFriendship = await Friendship.create({ user_id, friend_id });

    res.status(201).json(newFriendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//find users friendship that status = accepted

exports.findAcceptedFriendships = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const friendship = await Friendship.findAll(
      {
        where: {
          user_id,
          friend_id,
          status: "accepted",
        },
      },
      {
        where: {
          user_id: friend_id,
          friend_id: user_id,
          status: "accepted",
        },
      }
    );

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//find users friendship that status = pending

exports.findPendingFriendships = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const friendship = await Friendship.findAll(
      {
        where: {
          user_id,
          friend_id,
          status: "pending",
        },
      },
      {
        where: {
          user_id: friend_id,
          friend_id: user_id,
          status: "pending",
        },
      }
    );

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};
//find users friendship that status = declined
exports.findDeclinedFriendships = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const friendship = await Friendship.findAll(
      {
        where: {
          user_id,
          friend_id,
          status: "rejected",
        },
      },
      {
        where: {
          user_id: friend_id,
          friend_id: user_id,
          status: "rejected",
        },
      }
    );

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//find users friendship that status = blocked
exports.findBlockedFriendships = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const friendship = await Friendship.findAll(
      {
        where: {
          user_id,
          friend_id,
          status: "blocked",
        },
      },
      {
        where: {
          user_id: friend_id,
          friend_id: user_id,
          status: "blocked",
        },
      }
    );

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//find users friendship that status = deleted
exports.findDeletedFriendships = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const friendship = await Friendship.findAll(
      {
        where: {
          user_id,
          friend_id,
          status: "deleted",
        },
      },
      {
        where: {
          user_id: friend_id,
          friend_id: user_id,
          status: "deleted",
        },
      }
    );

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//find friendship with id

exports.findFriendshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const friendship = await Friendship.findByPk(id);

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//update friendship status

exports.updateFriendshipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const friendship = await Friendship.findByPk(id);

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    await friendship.update({ status });
    res.status(200).json(friendship);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};

//delete friendship

exports.deleteFriendship = async (req, res) => {
  try {
    const { id } = req.params;

    const friendship = await Friendship.findByPk(id);

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    await friendship.destroy();

    res.status(200).json({ message: "Friendship deleted" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Server error", message: err.message });
  }
};
