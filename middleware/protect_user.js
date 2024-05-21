require("dotenv").config();
const UserModel = require("../model/auth");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const protect_user = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new CustomError.BadRequestError("Invalid authorization format");
  }

  token = auth.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.headers = await UserModel.findById(decode.id).select("-password");

  next();
};

const protect_admin = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new CustomError.BadRequestError("Invalid authorization format");
  }

  token = auth.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(`read ${decode.id}`);

  req.headers = await UserModel.findById(decode.id).select("-password");

  next();
};

module.exports = { protect_user, protect_admin };
