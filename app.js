const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const friendshipRoutes = require('./routes/friendshipRoute');

require("./config/db");
require("./config/passport")(passport);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

require("./config/passport")(passport); // Import and configure passport

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/photos", photoRoutes);
// app.use("/api/places", placeRoutes);
// app.use("/api/reviews", reviewRoutes);
app.use("/api/friendships", friendshipRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);



app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
