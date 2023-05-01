const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
