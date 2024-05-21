const express = require('express');
const walletRoute = express.Router();
const {
    withdrawBalance
} = require('../controller/wallet');
const protectUser = require('../util/protect');

walletRoute.route('/withdraw').post(protectUser, withdrawBalance);

module.exports = walletRoute;
