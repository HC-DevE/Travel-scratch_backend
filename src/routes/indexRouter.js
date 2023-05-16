const express = require("express");
const app = express();

const authRoutes = require("./authRoutes");
const friendshipRoutes = require("./friendshipRoute");
const passwordRoutes = require("./passwordRoutes");
const mediaRoutes = require("./mediaRoutes");
const placeRoutes = require("./placeRoutes");
const postRoutes = require("./postRoutes");
const reviewRoutes = require("./reviewRoutes");
const searchRoutes = require("./searchRoutes");
const tripRoutes = require("./tripRoutes");
const userRoutes = require("./userRoutes");

app.use("/auth", authRoutes);
app.use("/friendships", friendshipRoutes);
app.use("/medias", mediaRoutes);
app.use("/password", passwordRoutes);
app.use("/places", placeRoutes);
app.use("/posts", postRoutes);
app.use("/reviews", reviewRoutes);
app.use("/search", searchRoutes);
app.use("/trips", tripRoutes);
app.use("/users", userRoutes);
// app.use("/comments", commentRoutes);
// app.use("/likes", likeRoutes);

module.exports = app;
