const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword);
router.post('/change-password', passwordController.changePassword);

module.exports = router;