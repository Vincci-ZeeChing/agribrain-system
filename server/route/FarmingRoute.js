const express = require('express');
const { getFarming, getFarmingById, createFarming, updateFarming, deleteFarming } = require("../controller/Farming.js");

const router = express.Router();

router.get('/api/v1/farming', getFarming);
router.get('/api/v1/farming/:id', getFarmingById);
router.post('/api/v1/farming', createFarming);
router.patch('/api/v1/farming/:id', updateFarming);
router.delete('/api/v1/farming/:id', deleteFarming);

module.exports = router;
