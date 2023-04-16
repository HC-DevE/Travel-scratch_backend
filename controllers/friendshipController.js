// /controllers/friendshipController.js

const { Friendship } = require('../models/Friendship');

exports.createFriendship = async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;

    if (user_id === friend_id) {
      return res.status(400).json({ message: "You can't be friends with yourself" });
    }

    const existingFriendship = await Friendship.findOne({
      where: {
        user_id,
        friend_id,
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Friendship already exists' });
    }

    const newFriendship = await Friendship.create({ user_id, friend_id });

    res.status(201).json(newFriendship);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};