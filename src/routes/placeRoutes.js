const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/authHandler");
const placeController = require("../controllers/placeController");
const limiterHandler = require("../middleware/limiterHandler");

router.post("/", authHandler, limiterHandler, placeController.createPlace);

router.get("/", authHandler, placeController.getUserPlaces);
router.get("/:placeId", authHandler, placeController.getUserPlaceById);

//general get places routes
router.get("/:placeId", placeController.getPlaceById);
router.get("/all", placeController.getAllPlaces);

router.put("/:placeId", authHandler, placeController.updatePlace);

router.delete("/:placeId", authHandler, placeController.deletePlace);

module.exports = router;
