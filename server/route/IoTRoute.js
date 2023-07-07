const express = require('express');
const { getSensorData } = require ("../controller/IoT.js");

const router = express.Router();

router.get('/api/v1/sensorData', getSensorData);


module.exports = router;
