//reviews routes

const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const authHandler = require("../middlewares/authHandler");

router.post("/", authHandler, reviewController.createReview);

router.get("/all", reviewController.getAllReviews);

router.get("/", authHandler, reviewController.getAllReviews);
router.get("/:id", authHandler, reviewController.getReviewById);

router.put("/:id", authHandler, reviewController.updateReview);

router.delete("/:id", authHandler, reviewController.deleteReview);

module.exports = router;
