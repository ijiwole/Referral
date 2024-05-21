const express = require('express');
const referralRoute = express.Router();
const {
    generateReferralCode,
    shareMyReferralCode
} = require('../controller/referrals');
const protectUser = require('../util/protect');

referralRoute.route('/generate').post(protectUser, generateReferralCode);
referralRoute.route('/get').get(protectUser, shareMyReferralCode);

module.exports = referralRoute;
