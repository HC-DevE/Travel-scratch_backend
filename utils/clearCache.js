const cache = {};

function clearCache(userId, placeId, tripId) {
  try {
    if (userId) {
      // Clear the cache for the specified user
      cache[`user:${userId}`] = null;
    }
    if (placeId) {
      // Clear the cache for the specified place
      cache[`place:${placeId}`] = null;
    }
    if (tripId) {
      // Clear the cache for the specified trip
      cache[`trip:${tripId}`] = null;
    }
    console.log("Cache cleared successfully");
  } catch (err) {
    console.error(`Failed to clear cache: ${err}`);
  }
}

module.exports = clearCache;
