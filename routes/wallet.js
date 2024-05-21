const express = require('express');
const walletRoute = express.Router();
const {
    withdrawBalance,
    fundWallet
} = require('../controller/wallet');
const {protect_user} = require('../middleware/protect_user');

walletRoute.route('/withdraw').post(protect_user, withdrawBalance);
walletRoute.route('/fund').post(protect_user, fundWallet);

module.exports = walletRoute;
