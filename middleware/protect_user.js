require("dotenv").config();
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes')

const protect_user = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid authorization format"
    })
  }

  token = auth.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.headers = await UserModel.findById(decode.id).select("-password");

  next();
};

module.exports = { protect_user };
