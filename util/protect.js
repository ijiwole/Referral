const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const protectUser = async(req, res, next) => {
    let token;
    const auth = req.headers.authorization;
    if(!auth || auth.startsWith("Bearer  ")){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'invalid token provided'
        })
    }

    token = auth.split("  ")[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.headers = await UserModel.findById(decode.id);
}

module.exports = protectUser;