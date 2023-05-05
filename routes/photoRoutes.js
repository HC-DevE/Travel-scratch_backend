const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const photoController = require("../controllers/photoController");

router.post("/", upload.single("photo"), photoController.createPhoto);
router.get("/:id", photoController.getPhoto);

module.exports = router;
