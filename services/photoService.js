const sequelize = require("../config/db");
const Photo = require("../models/Photo")(sequelize);
const AWS = require("aws-sdk");
const sharp = require("sharp");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: process.env.DO_SPACES_REGION,
  endpoint: new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT),
});

async function uploadPhoto(file) {
  try {
    const compressedImage = await sharp(file.buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toBuffer();

    const key = `uploads/${Date.now()}_${file.originalname}`;

    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: key,
      Body: compressedImage,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    await s3.upload(params).promise();

    const url = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${key}`;

    return { url };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload photo");
  }
}

async function savePhotoToDatabase(placeId, tripId, userId, url) {
  console.log();
  try {
    const photo = await Photo.create({
      place_id: placeId,
      trip_id: tripId,
      user_id: userId,
      url: url,
    });

    return photo.id;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save photo to database");
  }
}

async function getPhotoUrl(photoId) {
  try {
    const photo = await Photo.findOne({
      attributes: ["url"],
      where: {
        id: photoId,
      },
    });
    if (!photo) {
      throw new Error("Photo not found");
    }
    return photo.url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve photo URL");
  }
}

module.exports = { uploadPhoto, savePhotoToDatabase, getPhotoUrl };
