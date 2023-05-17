// groupController.js

const sequelize = require("../config/db");

const { Group, User } = require("../models/Group")(sequelize);

exports.getGroups = async (req, res) => {
  const { User } = require("../models/associations")(sequelize);
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addParticipantsToGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const user = await User.findByPk(req.body.userId);
    await group.addUser(user);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.removeParticipantsFromGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const user = await User.findByPk(req.body.userId);
    await group.removeUser(user);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getParticipantsOfGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const users = await group.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.update(req.body, {
      where: { id: req.params.groupId },
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteGroup = async (req, res) => {
  try {
    await Group.destroy({
      where: { id: req.params.groupId },
    });
    res.status(200).json("Group deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
