const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authHandler = require("../middleware/authHandler");

router.post("/", authHandler, postController.createPost);
// router.get("/", postController.getPosts);
router.get("/:tripId", authHandler, postController.getPosts);
router.get("/friends/:userId", postController.getFriendsPosts);
// router.get("/:id", postController.getPostById);
// router.get("/users/:userId/posts", postController.getUserPosts);
// router.get("/trips/:tripId/posts", postController.getTripPosts);

module.exports = router;
