const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/authHandler");
const placeController = require("../controllers/placeController");

router.post("/", authHandler, placeController.createPlace);

router.get("/", authHandler, placeController.getUserPlaces);
router.get("/all", placeController.getAllPlaces);
router.get("/:id", placeController.getPlaceById);
router.get("/:id", authHandler, placeController.getUserPlaceById);

router.put("/:id", authHandler, placeController.updatePlace);

router.delete("/:id", authHandler, placeController.deletePlace);

module.exports = router;
