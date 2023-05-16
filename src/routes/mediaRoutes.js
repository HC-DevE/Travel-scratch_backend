const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const mediaController = require("../controllers/mediaController");

router.post("/", upload.single("media"), mediaController.createPhoto);
router.get("/:id", mediaController.getPhoto);

module.exports = router;
