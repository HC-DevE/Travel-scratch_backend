const sequelize = require("../config/db");
const Media = require("../models/Media")(sequelize);
const crypto = require("crypto");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: process.env.DO_SPACES_REGION,
  endpoint: new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT),
});

exports.uploadMedia = async (fileBuffer, mimeType) => {
  const fileExtension = mimeType.split("/")[1];
  const folderName = mimeType.startsWith("image/") ? "images" : "videos";

  const timestamp = Date.now(); //change this to a better date
  const fileHash = crypto.createHash("md5").update(fileBuffer).digest("hex");
  // console.log(fileHash);
  const fileName = `uploads/${folderName}/${fileHash}_${timestamp}.${fileExtension}`;
  const params = {
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ACL: "public-read",
    ContentType: mimeType,
    CacheControl: "max-age=3600", // enable caching for 1 hour = 3600s
  };
  try {
    await s3.upload(params).promise();
    const url = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;
    return { url };
  } catch (error) {
    console.error("Failed to upload media:", error);
    throw error;
  }
};

exports.saveMediaToDatabase = async (
  userId,
  tripId,
  placeId,
  mediaUrl,
  mediaType
) => {
  try {
    const media = await Media.create({
      user_id: userId,
      trip_id: tripId,
      place_id: placeId,
      type: mediaType,
      url: mediaUrl,
    });
    return media.id;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save media to database");
  }
};

exports.getMediaUrl = async (photoId) => {
  try {
    const photo = await Media.findOne({
      attributes: ["url"],
      where: {
        id: photoId,
      },
    });
    if (!photo) {
      throw new Error("Media not found");
    }
    return photo.url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve photo URL");
  }
};

exports.getMediaRecords = async (userId, placeId, tripId) => {
  try {
    //fetch media records based on the provided parameters
    const photos = await Media.findAll({
      where: {
        user_id: userId,
        place_id: placeId,
        trip_id: tripId,
      },
    });

    return photos;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve media records");
  }
};
