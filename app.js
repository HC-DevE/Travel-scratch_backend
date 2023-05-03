const express = require("express");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

const indexRouter = require("./routes/indexRouter");
const pageNotFoundRoute = require("./routes/pageNotFoundRoute");
const errorHandler = require("./middleware/errorHandler");

require("./config/db");
require("./config/passport")(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Import and configure passport
require("./config/passport")(passport);

app.use("/api", indexRouter);
app.use(pageNotFoundRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
