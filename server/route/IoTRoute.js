const express = require('express');
const { getSensorData, getRealTimeSensorData, createSensorData } = require("../controller/IoT.js");

const router = express.Router();

router.get('/api/v1/sensorData', getSensorData);
router.get('/api/v1/sensorDataRealTime', getRealTimeSensorData);
router.post('/api/v1/sensorData', createSensorData);


module.exports = router;
