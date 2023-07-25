const express = require('express');
const { getCrop, getCropById, createCrop, updateCrop, deleteCrop } = require("../controller/Crop.js");
const { verifyUser } = require("../middleware/AuthUser");

const router = express.Router();

router.get('/api/v1/crop', verifyUser, getCrop);
router.get('/api/v1/crop/:id', verifyUser, getCropById);
router.post('/api/v1/crop', verifyUser, createCrop);
router.patch('/api/v1/crop/:id', verifyUser, updateCrop);
router.delete('/api/v1/crop/:id', verifyUser, deleteCrop);

module.exports = router;
