const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const authHandler = require("../middleware/authHandler");

router.get("/all", tripController.getAllTrips);
router.post("/", authHandler, tripController.createTrip);
router.get("/", authHandler, tripController.getUserTrips);
router.get("/:id", authHandler, tripController.getUserTrip);

module.exports = router;
