import express from "express";

const getUser = require('../controller/User.js');
const getUserById = require('../controller/User.js');
const createUser = require('../controller/User.js');
const updateUser = require('../controller/User.js');
const deleteUser = require('../controller/User.js');

const router = express.Router();


router.get('/user',getUser);
router.get('/user/:id',getUserById);
router.post('/user',createUser);
router.patch('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);