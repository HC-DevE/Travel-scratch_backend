const mediaService = require("../services/mediaService");
const userService = require("../services/userService");
const clearCache = require("../utils/clearCache");
const upload = require("../config/multer");

exports.uploadMedia = async (req, res) => {
  try {
    const { placeId, tripId, userId } = req.body;

    // Check if the user has access to the place or trip
    const canUpload = await userService.checkUserAccessTrip(userId, placeId, tripId);

    if (!canUpload) {
      return res.status(401).json({
        error: "You don't have access to upload medias for this place/trip",
      });
    }

    // Save the uploaded media to external storage
    const file = req.file;
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
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const url = await mediaService.getMediaUrl(mediaId);
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Photo not found" });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const { placeId, tripId, userId } = req.query;

    // Check if the user has access to the place or trip
    const canUpload = await userService.checkUserAccessTrip(userId, tripId);

    if (!canUpload) {
      return res.status(401).json({
        error: "You don't have access to upload medias for this place/trip",
      });
    }

    // Get the media records from the database
    const photos = await mediaService.getMediaRecords(userId, placeId, tripId);

    // Get the media URLs
    const urls = await Promise.all(
      photos.map(async (photo) => {
        return await mediaService.getMediaUrl(photo.id);
      })
    );

    res.status(200).json({ urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
