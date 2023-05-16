const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Facebook authentication
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/auth/login' }), authController.facebookAuthCallback);


// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/login' }), authController.googleAuthCallback);

module.exports = router;