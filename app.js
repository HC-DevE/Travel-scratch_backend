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
const friendshipRoutes = require("./routes/friendshipRoute");
const passwordRoutes = require("./routes/passwordRoutes");

require("./config/db");
require("./config/passport")(passport);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// Import and configure passport
require("./config/passport")(passport);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res) => {
  res.json({ message: "Working !" }); 
});

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
app.use("/api/password", passwordRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
