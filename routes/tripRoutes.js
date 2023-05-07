const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const postController = require("../controllers/postController");
const authHandler = require("../middleware/authHandler");

router.post("/", authHandler, tripController.createTrip);
router.get("/all", tripController.getAllTrips);
router.get("/", authHandler, tripController.getUserTrips);
router.get("/:id", authHandler, tripController.getUserTrip);

// Create a new post for a trip
router.post("/:tripId/posts", postController.createTripPost);

// Retrieve all posts for a trip
router.get("/:tripId/posts", postController.getTripPosts);

module.exports = router;
