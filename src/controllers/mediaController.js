const mediaService = require("../services/mediaService");
const userService = require("../services/userService");
const clearCache = require("../utils/clearCache");
const upload = require("../config/multer");

exports.uploadMedia = async (req, res) => {
  try {
    const { placeId, tripId, userId } = req.body;

    // Check if the user has access to the place or trip
    const canUpload = await userService.checkUserAccessTrip(userId, tripId);
    if (!canUpload) {
      return res.status(401).json({
        error: "You don't have access to upload medias for this trip",
      });
    }

    // Save the uploaded media to external storage
    const file = req.file;
    //check if the file not empty
    if (!file || !file.mimetype) {
      return res.status(400).json({ error: "File is required" });
    }
    
    const compressedFile = await upload.compressFile(file);

    // Save the compressed file to external storage
    const { url } = await mediaService.uploadMedia(
      compressedFile,
      file.mimetype
    );

    // Save the media record to the database
    const mediaId = await mediaService.saveMediaToDatabase(
      userId,
      tripId,
      placeId,
      url,
      file.mimetype.startsWith("image/") ? "photo" : "video"
    );

    // Clear the cache for the current user and place/trip
    clearCache(userId, placeId, tripId);

    res.status(201).json({ id: mediaId });
  } catch (error) {
    console.error(error);
    // if (error.code === "409") {
      // res.status(409).json({ error: "Media already exists" });
    // } else {
      res.status(500).json({ error: "Internal server error" });
    // }
  }
};

//TODO: check user privileges
exports.getMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const url = await mediaService.getMediaUrl(mediaId);
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Media not found" });
  }
};

exports.getMedias = async (req, res) => {
  try {
    const { placeId, tripId } = req.query;
    const userId = req.user.id;

    // Check if the user has access to the place or trip
    const canUpload = await userService.checkUserAccessTrip(userId, tripId);

    if (!canUpload) {
      //check if the user is part of the trip group
      const isPartOfGroup = await userService.checkUserAccessGroup(userId, tripId);
      return res.status(401).json({
        error: "You don't have access to get medias for this trip",
      });
    }

    // Get the media records from the database
    const medias = await mediaService.getMediaRecords(userId, placeId, tripId);

    // Get the media URLs
    const urls = await Promise.all(
      medias.map(async (media) => {
        return await mediaService.getMediaUrl(media.id);
      })
    );

    res.status(200).json({ urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
