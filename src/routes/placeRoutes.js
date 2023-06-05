const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const placeController = require("../controllers/placeController");
const limiterHandler = require("../middlewares/limiterhandler");

router.post("/", authHandler, limiterHandler, placeController.createPlace);

//user get places routes
router.get("/", authHandler, placeController.getUserPlaces);
router.get("/:placeId", authHandler, placeController.getUserPlaceById);

//general get places routes
router.get("/:placeId", placeController.getPlaceById);
router.get("/all", placeController.getAllPlaces);

router.put("/:placeId", authHandler, placeController.updatePlace);

router.delete("/:placeId", authHandler, placeController.deletePlace);

module.exports = router;
