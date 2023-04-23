const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/authHandler");
const tripPlaceController = require("../controllers/tripplaceController");

router.post("/", authHandler, tripPlaceController.createTripPlace);

router.get("/", authHandler, tripPlaceController.getUserTripPlaces);
router.get("/all", tripPlaceController.getTripPlaces);
router.get("/:id", tripPlaceController.getTripPlaceById);

router.put("/:id", authHandler, tripPlaceController.updateTripPlace);

router.delete("/:id", authHandler, tripPlaceController.deleteTripPlace);

module.exports = router;
