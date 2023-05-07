const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const postController = require("../controllers/postController");
const authHandler = require("../middleware/authHandler");

router.post("/", authHandler, tripController.createTrip);
router.get("/all", tripController.getAllTrips);
router.get("/", authHandler, tripController.getUserTrips);
router.get("/:id", authHandler, tripController.getUserTrip);
// router.put("/:id", authHandler, tripController.updateTrip);
// router.delete("/:id", authHandler, tripController.deleteTrip);
//search trip
router.get("/search", authHandler, tripController.searchTrips);

// Create a new post for a trip
router.post("/:tripId/posts", authHandler, postController.createTripPost);

// Retrieve all posts for a trip
router.get("/:tripId/posts", postController.getTripPosts);

module.exports = router;
