// /routes/friendshipRoutes.js

const express = require('express');
const router = express.Router();

const { createFriendship } = require('../controllers/friendshipController');

router.post('/', createFriendship);

module.exports = router;