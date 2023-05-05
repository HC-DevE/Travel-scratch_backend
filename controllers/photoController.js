const photoService = require("../services/photoService");
const clearCache = require("../utils/clearCache");

exports.createPhoto = async (req, res) => {
  try {
    const { placeId, tripId, userId } = req.body;

    // Check if the user has access to the place or trip
    // const canUpload = await checkUserAccess(userId, placeId, tripId);

    // if (!canUpload) {
    //   return res.status(401).json({
    //     error: "You don't have access to upload photos for this place/trip",
    //   });
    // }

    // Save the uploaded photo to external storage
    const file = req.file;
    const { url } = await photoService.uploadPhoto(file);

    // Save the photo record to the database
    const photoId = await photoService.savePhotoToDatabase(
      placeId,
      tripId,
      userId,
      url
    );

    // Clear the cache for the current user and place/trip
    clearCache(userId, placeId, tripId);

    res.status(201).json({ id: photoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const photoId = req.params.id;
    const url = await photoService.getPhotoUrl(photoId);
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Photo not found" });
  }
};
