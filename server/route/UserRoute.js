const express = require('express');
const { getUser, getUserById, createUser, updateUser, deleteUser } = require("../controller/User.js");
const { verifyUser, adminFarmerOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/api/v1/user', verifyUser, adminFarmerOnly, getUser);
router.get('/api/v1/user/:id', verifyUser, adminFarmerOnly, getUserById);
router.post('/api/v1/user', verifyUser, adminFarmerOnly, createUser);
router.patch('/api/v1/user/:id', verifyUser, adminFarmerOnly, updateUser);
router.delete('/api/v1/user/:id', verifyUser, adminFarmerOnly, deleteUser);


module.exports = router;
