// /routes/friendshipRoutes.js

const express = require("express");
const router = express.Router();
const friendshipController = require("../controllers/friendshipController");
const authHandler = require("../middlewares/authHandler");

router.post("/", authHandler ,friendshipController.createFriendship);

router.get("/", authHandler ,friendshipController.findAcceptedFriendships);
router.get("/:id", authHandler ,friendshipController.findFriendshipById);

router.put("/:id", authHandler ,friendshipController.updateFriendshipStatus);

router.delete("/:id", authHandler ,friendshipController.deleteFriendship);

module.exports = router;
