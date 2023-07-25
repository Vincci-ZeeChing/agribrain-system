const express = require('express');
const { getCurrentWeather, getForecastWeather, getHistoryWeather } = require("../controller/Weather.js");

const router = express.Router();

router.get('/api/v1/currentWeather', getCurrentWeather);
router.get('/api/v1/forecastWeather', getForecastWeather);
router.get('/api/v1/historyWeather', getHistoryWeather);

module.exports = router;
