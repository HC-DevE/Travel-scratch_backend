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

// const multer = require("multer");

// const storage = multer.memoryStorage();
// const fileFilter = function (req, file, cb) {
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   cb(null, true);
// };

// //add a maximum image size to 5MB
// const upload = multer({ storage, fileFilter, limits: { fileSize: 5000000 } });

// module.exports = upload;

//support videos too
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + extension);
//   },
// });

//using compress

const multer = require("multer");
const sharp = require("sharp");
const VideoCompressor = require("video-compressor");

const storage = multer.memoryStorage();
const maxSize = 50 * 1024 * 1024; // Maximum file size in bytes (5 MB)

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
  ];
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

const compressImage = (buffer) => {
  return sharp(buffer).resize({ width: 1024 }).jpeg({ quality: 80 }).toBuffer();
};

async function compressVideo(buffer) {
  //TODO: evolution ? to implement later
}

const compressFile = (file) => {
  if (file.mimetype.startsWith("image/")) {
    return compressImage(file.buffer);
  // } else if (file.mimetype.startsWith("video/")) {
  //   return compressVideo(file.buffer);
  } else {
    return Promise.resolve(file.buffer);
  }
};

module.exports = { upload, compressFile };
