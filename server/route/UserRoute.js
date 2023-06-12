const express = require('express');
const { getUser, getUserById, createUser, updateUser, deleteUser } = require("../controller/User.js");
// const { verifyUser } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/api/v1/user', getUser);
router.get('/api/v1/user/:id', getUserById);
router.post('/api/v1/user', createUser);
router.patch('/api/v1/user/:id', updateUser);
router.delete('/api/v1/user/:id', deleteUser);

module.exports = router;
