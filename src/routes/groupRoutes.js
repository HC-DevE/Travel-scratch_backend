const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authHandler = require("../middlewares/authHandler");

router.post("/create", authHandler, groupController.createGroup);
router.post("/:groupId/addMembers", authHandler, groupController.addGroupMember);

router.get("/all", authHandler, groupController.getGroups);
router.get("/:groupId/members", authHandler, groupController.getGroupMembers);
router.get("/:groupId", authHandler, groupController.getGroupById);

router.put("/:groupId", authHandler, groupController.updateGroup);
router.put("/:groupId/members/:memberId",authHandler,groupController.updateGroupMembers);

router.delete("/:groupId", authHandler, groupController.deleteGroup);
router.delete("/:groupId/members/:memberId", authHandler, groupController.removeGroupMembers);

module.exports = router;
