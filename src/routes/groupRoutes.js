const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authHandler = require("../middleware/authHandler");

router.get("/all", groupController.getGroups);
router.post("/group", groupController.createGroup);
router.post("/:groupId/members", groupController.addGroupMember);
router.get("/:groupId/members", authHandler, groupController.getMembersOfGroup);
router.get("/:groupId", authHandler, groupController.getGroupById);
router.put("/:groupId", authHandler, groupController.updateGroup);
router.delete("/:groupId", authHandler, groupController.deleteGroup);

module.exports = router;
