const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authHandler = require('../middleware/authHandler');

router.post('/', authHandler, tripController.createTrip);
router.get('/', authHandler, tripController.getTrips);
router.get('/all', tripController.getAllTrips);

module.exports = router;