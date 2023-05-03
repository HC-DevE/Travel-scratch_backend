const express = require("express");
const app = express();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const tripRoutes = require("./tripRoutes");
const friendshipRoutes = require("./friendshipRoute");
const passwordRoutes = require("./passwordRoutes");
const placeRoutes = require("./placeRoutes");
const reviewRoutes = require("./reviewRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/trips", tripRoutes);
// app.use("/posts", postRoutes);
// app.use("/photos", photoRoutes);
app.use("/places", placeRoutes);
app.use("/reviews", reviewRoutes);
app.use("/friendships", friendshipRoutes);
// app.use("/comments", commentRoutes);
// app.use("/likes", likeRoutes);
app.use("/password", passwordRoutes);

module.exports = app;
