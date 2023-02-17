const express = require('express');
const router = express.Router();
const userController  = require('../controllers/userController');

/*  users listing. */
router.post('/registration', userController.signUp);
router.post('/login', userController.login);

module.exports = router;
