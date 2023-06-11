const express = require('express');
const { getCrop, getCropById, createCrop, updateCrop, deleteCrop } = require("../controller/Crop.js");

const router = express.Router();

router.get('/api/v1/crop', getCrop);
router.get('/api/v1/crop/:id', getCropById);
router.post('/api/v1/crop', createCrop);
router.patch('/api/v1/crop/:id', updateCrop);
router.delete('/api/v1/crop/:id', deleteCrop);

module.exports = router;
