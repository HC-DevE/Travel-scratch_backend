const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const authHandler = require("../middleware/authHandler");

router.post("/", authHandler, tripController.createTrip);
router.get("/all", tripController.getAllTrips); //TODO: see the priveleges and utility
router.get("/userTrips", authHandler, tripController.getUserTrips);
router.get("/userTrips/:tripId", authHandler, tripController.getUserTrip);
router.get("/friendTrips/:friendId", authHandler, tripController.getFriendTrips);
// router.get("/friendTrips/:friendId/:tripId", authHandler, tripController.getFriendTrip);
// router.put("/:id", authHandler, tripController.updateTrip);
// router.delete("/:id", authHandler, tripController.deleteTrip);

//search trip
router.get("/search", authHandler, tripController.searchTrips);

module.exports = router;
