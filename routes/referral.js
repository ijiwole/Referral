const express = require('express');
const referralRoute = express.Router();
const {
    generateReferralCode,
    shareMyReferralCode
} = require('../controller/referrals');
const {protect_user} = require('../middleware/protect_user');

referralRoute.route('/generate').post(protect_user, generateReferralCode);
referralRoute.route('/get').get(protect_user, shareMyReferralCode);

module.exports = referralRoute;
