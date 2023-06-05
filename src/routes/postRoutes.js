const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authHandler = require("../middlewares/authHandler");

router.post("/", authHandler, postController.createPost);

router.get("/all", authHandler, postController.getUserPosts);
router.get("/:id", authHandler, postController.getPostById);
router.get("/trips/:tripId", authHandler, postController.getTripPostsById); //TODO: à revoir l'utilité
router.get("/friends/:friendId", postController.getFriendsPostsById);

router.put("/:id", authHandler, postController.updatePost);
router.delete("/:id", authHandler, postController.deletePost);

module.exports = router;
