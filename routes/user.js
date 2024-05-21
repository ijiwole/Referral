const express = require('express');
const userRoute = express.Router();
const {
    register,
    login,
    getProfile
} = require('../controller/user');
const { protect_user } = require('../middleware/protect_user');

userRoute.route('/register').post(register);
userRoute.route('/login').post(login);
userRoute.route('/profile').get(protect_user, getProfile)

module.exports = userRoute;
