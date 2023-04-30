const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const indexRoutes = require("./routes/indexRoutes");
const pageNotFoundRoute = require("./routes/pageNotFoundRoute");
const errorHandler = require("./middleware/errorHandler");

require("./config/db");
require("./config/passport")(passport);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// Import and configure passport
require("./config/passport")(passport);

app.use("/api", indexRoutes);
app.use("*", pageNotFoundRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
