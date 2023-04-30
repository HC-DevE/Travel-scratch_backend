const sequelize = require("../config/db");
const User = require("../models/User")(sequelize);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
// const FacebookStrategy = require('passport-facebook').Strategy;
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register
exports.register = async (req, res) => {
  // Validate and create user
  const {
    first_name,
    last_name,
    email,
    password_hash,
    birth_date,
    gender,
    preferences,
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      birth_date,
      gender,
      preferences,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  // Check credentials and return JWT
  const { email, password_hash } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password_hash, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = { id: user.id, email: user.email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        // res.json({ success: true, token: "Bearer " + token });
        res.json({ success: true, token: token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: "your_google_client_id",
      clientSecret: "your_google_client_secret",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Implement logic to handle Google user data and create or update user in the database
      const newUser = {
        googleId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        password: profile.id,
        birth_date: "1990-01-01",
      };
      try {
        // Check if user already exists in the database
        let user = await User.findOne({
          where: { googleId: newUser.googleId },
        });

        if (user) {
          // If the user exists, call the done callback with the user object
          done(null, user);
        } else {
          // If the user does not exist, create a new user in the database and call the done callback with the created user object
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

exports.googleAuthCallback = (req, res) => {
  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Send the JWT token back to the client
  res.json({ token });
};
