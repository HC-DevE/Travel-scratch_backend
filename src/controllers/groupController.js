// groupController.js
//THIS FILE HAS BEEN CHECKED; NOTES: try to optimize all the imports at one place...
const sequelize = require("../config/db");
const Group = require("../models/Group")(sequelize);
// const GroupMember = require("../models/GroupMember")(sequelize);
// const Trip = require("../models/Trip")(sequelize);
// const User = require("../models/User")(sequelize);

exports.createGroup = async (req, res) => {
  const { Group, Trip, User } = require("../models/associations")(sequelize);
  try {
    // const user = User.findByPk(req.user.id);
    // const user = req.user;
    const { name, description, tripId } = req.body;

    // Verify if userId belongs to the same trip user_id
    const trip = await Trip.findOne({ where: { id: tripId } });
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (trip.user_id !== user.id) {
      return res.status(403).json({
        message:
          "You are not authorized to create a group for another user's trip!",
      });
    }

    // Check if the trip_id belongs to a group already
    const existingGroup = await Group.findOne({ where: { trip_id: tripId } });
    if (existingGroup) {
      return res
        .status(403)
        .json({ message: "A group already exists for this trip!" });
    }

    // Create the group
    const newGroup = await Group.create({
      name,
      description,
      trip_id: tripId,
      created_by: user.id,
    });

    // Add the user as an admin to the group
    await newGroup.addUser(user, { through: { role: "admin" } });
    res.status(201).json({ group: newGroup });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGroups = async (req, res) => {
  const { User } = require("../models/associations")(sequelize);
  try {
    const user = await User.findByPk(req.user.id);
    const groups = await user.getGroups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addGroupMember = async (req, res) => {
  const { Group, User } = require("../models/associations")(sequelize);
  try {
    const { userId, role } = req.body;
    const { groupId } = req.params;

    // Validate input data
    if (!userId || !groupId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if the group and user exist
    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);

    if (!group || !user) {
      return res.status(404).json({ message: "Group or user not found" });
    }

    if (group.created_by !== req.user.id) {
      return res.status(403).json({
        message: "You do not have permission to add members to this group",
      });
    }

    // Validate role //TODO: adjusting roles for new members (only members or can be admin)
    const allowedRoles = ["member", "admin"];
    const validatedRole = allowedRoles.includes(role) ? role : "member";

    // Check if the user belongs to the group already
    const existingMember = await group.hasUser(user.id);
    if (existingMember) {
      return res
        .status(400)
        .json({ message: "This User is already member of this group" });
    }
    await group.addUser(user, { through: { role: validatedRole } });
    res.status(201).json({ message: "User added to group" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGroupMembers = async (req, res) => {
  try {
    const { Group } = require("../models/associations")(sequelize);
    const { role } = req.body;
    const { groupId, memberId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.created_by !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this member" });
    }

    const member = await group.getUsers({ where: { id: memberId } });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    //update the member role
    const validatedRole = role ? role : "member";
    await group.addUser(member, { through: { role: validatedRole } });

    res.status(200).json({ message: "Group member role updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//to check again the !!isMember
exports.removeGroupMembers = async (req, res) => {
  const { Group, User } = require("../models/associations")(sequelize);
  try {
    const { groupId, memberId } = req.params;
    const userId = req.user.id;

    //check if the group exists
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the member exists
    const member = await User.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Check if the member is part of the group
    const isMember = await group.hasUser(member.id);
    if (!isMember) {
      return res
        .status(404)
        .json({ message: "Member does not belong to this group" });
    }

    //check if the user is the creator of the group
    if (group.created_by !== userId) {
      return res.status(403).json({
        message: "You do not have permission to remove members from this group",
      });
    }

    //remove the member from the group
    await group.removeUser(memberId);

    // Check if the group has any remaining members //TODO: to keep in feature ?
    const groupMembers = await group.getUsers();
    if (groupMembers.length === 0) {
      // Delete the group if there are no remaining members
      await group.destroy();
      return res
        .status(200)
        .json({ message: "User removed from group and group deleted" });
    }

    res.status(200).json({ message: "User removed from group" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGroupMembers = async (req, res) => {
  const { Group } = require("../models/associations")(sequelize);
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    // Check if the group exists
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is a member of the group
    const isMember = await group.hasUser(userId);
    const isCreator = group.created_by === userId;
    if (!isMember & !isCreator) {
      return res.status(403).json({
        message: "You do not have permission to view the members of this group",
      });
    }

    // Get the group members
    const groupMembers = await group.getUsers({
      attributes: ["id", "first_name", "last_name", "email"],
    });
    // //example of raw sql query
    //   const query = `
    //   SELECT
    //     gm.group_id,
    //     gm.user_id,
    //     gm.role,
    //     gm.created_at,
    //     gm.updated_at,
    //     u.id AS user_id,
    //     u.first_name,
    //     u.last_name,
    //     u.email,
    //     u.birth_date,
    //     u.profile_picture,
    //     u.gender,
    //     u.preferences,
    //     u.last_known_latitude,
    //     u.last_known_longitude,
    //     u.created_at AS user_created_at,
    //     u.updated_at AS user_updated_at
    //   FROM
    //     group_members AS gm
    //   JOIN
    //     users AS u ON gm.user_id = u.id
    //   WHERE
    //     gm.group_id = :groupId;
    // `;
    //   replacements = { groupId };
    //   const members = await sequelize.query(query, {
    //     type: sequelize.QueryTypes.SELECT,
    //     replacements,
    //   });
    res.status(200).json(groupMembers);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGroupById = async (req, res) => {
  const { Group } = require("../models/associations")(sequelize);
  const { groupId } = req.params;
  const userId = req.user.id;
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is a member of the group
    const isMember = await group.hasUser(userId);
    const isCreator = group.created_by === userId;
    if (!isMember & !isCreator) {
      return res.status(403).json({
        message: "You do not have permission to view this group",
      });
    }

    // Get the group members ??
    // const groupMembers = await group.getUsers({
    //   attributes: ["id", "first_name", "last_name", "email"],
    // });

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGroup = async (req, res) => {
  const { Group } = require("../models/associations")(sequelize);
  const { groupId } = req.params;
  const userId = req.user.id;
  try {
    // Check if the group exists
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is a member of the group
    const isMember = await group.hasUser(userId);
    const isCreator = group.created_by === userId;
    if (!isMember & !isCreator) {
      return res.status(403).json({
        message: "You do not have permission to update this group",
      });
    }

    // Update the group details
    const updatedGroup = await Group.update(req.body, {
      where: { id: groupId },
    });

    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    //check if the user requesting is the admin fo the group
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (group.created_by !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this group" });
    }
    await Group.destroy({
      where: { id: req.params.groupId },
    });
    res.status(200).json("Group deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
