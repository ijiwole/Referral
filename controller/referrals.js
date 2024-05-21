const {StatusCodes} = require("http-status-codes");


const generateReferralCode = async (req, res) => {
    try {
        const user = req.headers;
        const referralCode = Math.random().toString(36).substring(2, 10);
        user.referralCode = referralCode;
        await user.save();
        res.status(StatusCodes.CREATED).json({ referralCode, message: 'referralCode created' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `internal server error: ${error.message}`});
    }
}

const shareMyReferralCode = async(req, res) => {
    try {
        const user = req.headers;
        res.status(StatusCodes.CREATED).json({ referralCode: user.referralCode, message: 'referralCode retrieved' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `internal server error: ${error.message}`});
    }
}

module.exports = {
    generateReferralCode,
    shareMyReferralCode
}
