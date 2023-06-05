const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authHandler = require("../middlewares/authHandler");

router.get("/all", userController.getAllUsers);
router.get("/profile", authHandler, userController.getUserProfile);
router.get("/search", authHandler, userController.searchUser);
router.put("/profile", authHandler, userController.updateUserProfile);
router.delete("/profile", authHandler, userController.deleteUserProfile);

module.exports = router;
