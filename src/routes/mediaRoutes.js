const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const mediaController = require("../controllers/mediaController");
const authHandler = require("../middlewares/authHandler");

router.post("/", upload.single("media"), mediaController.uploadMedia);
router.get("/all", authHandler, mediaController.getMedias);
router.get("/:id", mediaController.getMedia);
// router.delete("/:id", mediaController.deleteMedia);

module.exports = router;
