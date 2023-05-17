const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authHandler = require("../middleware/authHandler");

router.get("/all", authHandler, groupController.getGroups);
router.post("/group", authHandler, groupController.createGroup);
router.post(
  "/:groupId/participants",
  authHandler,
  groupController.addParticipantsToGroup
);
router.get(
  "/:groupId/participants",
  authHandler,
  groupController.getParticipantsOfGroup
);
router.get("/:groupId", authHandler, groupController.getGroupById);
router.put("/:groupId", authHandler, groupController.updateGroup);
router.delete("/:groupId", authHandler, groupController.deleteGroup);

module.exports = router;
