// const multer = require('multer');

// const storage = multer.memoryStorage();
// const fileFilter = function (req, file, cb) {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = function (req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
