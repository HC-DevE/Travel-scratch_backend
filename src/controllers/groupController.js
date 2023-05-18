// groupController.js

const sequelize = require("../config/db");

const Group = require("../models/Group")(sequelize);
const User = require("../models/User")(sequelize);

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
    const { name, tripId, createdBy } = req.body;
    const newGroup = await Group.create({ name, tripId, createdBy });

    // The user who created the group is automatically a member and an admin
    const adminMembership = await GroupMember.create({
      user_id: createdBy,
      group_id: newGroup.id,
      role: "admin",
    });

    res.status(201).json({ group: newGroup, membership: adminMembership });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addGroupMember = async (req, res) => {
  const { userId } = req.body;
  const { groupId } = req.params;

  const existingMember = await GroupMember.findOne({
    where: { userId, groupId },
  });
  if (existingMember) {
    return res
      .status(400)
      .json({ message: "User is already a member of this group" });
  }

  const newMember = await GroupMember.create({ userId, groupId });
  res.status(201).json({ member: newMember });
};

exports.updateGroupMember = async (req, res) => {
  const { role } = req.body;
  const { groupId, memberId } = req.params;

  const group = await Group.findOne({ where: { id: groupId } });

  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  if (group.created_by !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You do not have permission to update this member" });
  }

  const member = await GroupMember.findOne({ where: { id: memberId } });

  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  if (role) member.role = role;

  await member.save();

  res.status(200).json({ member });
};

exports.removeMembersFromGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const user = await User.findByPk(req.body.userId);
    await group.removeUser(user);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMembersOfGroup = async (req, res) => {
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
