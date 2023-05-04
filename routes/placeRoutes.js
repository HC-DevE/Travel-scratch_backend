const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/authHandler");
const placeController = require("../controllers/placeController");
const limiterHandler = require("../middleware/limiterHandler");

router.post("/", authHandler, limiterHandler, placeController.createPlace);

router.get("/", authHandler, placeController.getUserPlaces);
router.get("/:id", authHandler, placeController.getUserPlaceById);

//general get places routes
router.get("/:id", placeController.getPlaceById);
router.get("/all", placeController.getAllPlaces);

router.put("/:id", authHandler, placeController.updatePlace);

router.delete("/:id", authHandler, placeController.deletePlace);

module.exports = router;
