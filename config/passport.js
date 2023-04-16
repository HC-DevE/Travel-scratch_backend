const sequelize = require('./db');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')(sequelize);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
  // JWT strategy for token-based authentication
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error(err);
      return done(err, false);
    }
  }));

  // Google OAuth2 strategy for Google authentication
  passport.use(new GoogleStrategy({
    clientID: 'your_google_client_id',
    clientSecret: 'your_google_client_secret',
    callbackURL: '/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ where: { email } });

      if (!user) {
        // If the user doesn't exist, create a new one using Google profile data
        user = await User.create({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email,
          password: 'your_generated_password', // Generate a password for the user
          birth_date: '1900-01-01', // Set a default birth date
          gender: 'Not specified'
        });
      }

      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err, false);
    }
  }));
};
