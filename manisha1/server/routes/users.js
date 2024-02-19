const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/create', userController.registerUser);
router.post('/login', userController.signInUser);


module.exports = router;