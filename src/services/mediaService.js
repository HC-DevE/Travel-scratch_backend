const sequelize = require("../config/db");
const Media = require("../models/Media")(sequelize);
const crypto = require("crypto");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
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
    //check if a media has the same filehash in the url already exists
    const mediaExists = await Media.findOne({
      where: {
        url: { [Op.like]: `%${fileHash}%` },
      },
    });
    if (mediaExists) {
      throw new Error("Media already exists");
      //TODO: throw error 409
    }
    //upload the file
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

exports.getMediaUrl = async (mediaId) => {
  try {
    const media = await Media.findOne({
      attributes: ["url"],
      where: {
        id: mediaId,
      },
    });
    if (!media) {
      throw new Error("Media not found");
    }
    return media.url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve media URL");
  }
};

exports.getMediaRecords = async (userId, placeId, tripId) => {
  try {
    //fetch media records based on the provided parameters
    const medias = await Media.findAll({
      where: {
        user_id: userId,
        place_id: placeId,
        trip_id: tripId,
      },
    });

    return medias;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve media records");
  }
};
