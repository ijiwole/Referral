const UserModel = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const generateToken = require('../util/token');
const register = async(req, res) => {

    const { username, email, firstName, lastName, password, referralCode } = req.body;
    try{
        const user = await UserModel.create({
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            referredBy: referralCode
        });

        if(referralCode){
            await handleReferral(referralCode);
        }

        res.status(StatusCodes.CREATED).json({
            token: generateToken(user.id),
            message: 'registration successfully'
        })
    }catch(error){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Internal Sever Error: ${error.message}`
        })
    }

}

const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'email and password are required'
        })
    }

    try{
        const user = await UserModel.findOne({email: email});

        if (!user || !(await user.comparePassword(password))) {
           return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Invalid login credentials'
            })
        }

   return res.status(StatusCodes.OK).json({
        message: 'login successful',
        token: generateToken(user.id)
    })
    }catch(e){
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Internal Sever Error: ${e.message}`
        })
    }
}

const handleReferral = async (referralCode) => {
    const referringUser = await UserModel.findOne({ referralCode });
    if (referringUser) {
        referringUser.balance += 10;
        await referringUser.save();
    }
};

const getProfile = (req, res) => {
    const user = req.headers;
    return res.status(StatusCodes.OK).json({
        data: user,
        message: 'profile fetched'
    })
}

module.exports = {
    register,
    login,
    getProfile
}
