const express = require('express');
const walletRoute = express.Router();
const {
    withdrawBalance
} = require('../controller/wallet');
const {protect_user} = require('../middleware/protect_user');

walletRoute.route('/withdraw').post(protect_user, withdrawBalance);

module.exports = walletRoute;
