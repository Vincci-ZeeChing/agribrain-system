const express = require('express');
const { getCropManagement, getCropManagementById, createCropManagement, updateCropManagement, deleteCropManagement } = require("../controller/CropManagement.js");
const { verifyUser } = require("../middleware/AuthUser");

const router = express.Router();

router.get('/api/v1/cropManagement', verifyUser, getCropManagement);
router.get('/api/v1/cropManagement/:id', verifyUser, getCropManagementById);
router.post('/api/v1/cropManagement', verifyUser, createCropManagement);
router.patch('/api/v1/cropManagement/:id', verifyUser, updateCropManagement);
router.delete('/api/v1/cropManagement/:id', verifyUser, deleteCropManagement);

module.exports = router;
