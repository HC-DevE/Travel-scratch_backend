// errorHandler.js
function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json({ message: err.message });
}

module.exports = errorHandler;
