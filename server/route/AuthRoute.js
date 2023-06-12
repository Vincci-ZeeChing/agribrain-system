const express = require('express');
const { Login, Me, Logout } = require("../controller/Auth.js");

const router = express.Router();

router.post('/login',Login);
router.get('/me',Me);
router.delete('/logout',Logout);

module.exports = router;
