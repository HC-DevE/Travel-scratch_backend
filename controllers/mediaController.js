const mediaService = require("../services/mediaService");
const clearCache = require("../utils/clearCache");
const upload = require("../config/multer");

exports.createPhoto = async (req, res) => {
  try {
    const { placeId, tripId, userId } = req.body;

    // Check if the user has access to the place or trip
    // const canUpload = await checkUserAccess(userId, placeId, tripId);

    // if (!canUpload) {
    //   return res.status(401).json({
    //     error: "You don't have access to upload medias for this place/trip",
    //   });
    // }

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
