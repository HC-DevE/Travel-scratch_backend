//search routes.ts
const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/authHandler");
const searchController = require("../controllers/searchController");

router.get("/", authHandler, searchController.searchAll);
router.get("/all", authHandler, searchController.search);
router.get("/users", authHandler, searchController.searchUser);
router.get("/trips", authHandler, searchController.searchTrips);

module.exports = router;
