const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authHandler = require('../middleware/authHandler');

router.get('/profile', authHandler, userController.getUserProfile);
router.put('/profile', authHandler, userController.updateUserProfile);
router.delete('/profile', authHandler, userController.deleteUserProfile);


module.exports = router;