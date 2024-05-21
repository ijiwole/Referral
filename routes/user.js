const express = require('express');
const userRoute = express.Router();
const {
    register,
    login
} = require('../controller/user');

userRoute.route('/register').post(register);
userRoute.route('/login').post(login);

module.exports = userRoute;
