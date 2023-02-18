const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const userServices = require("../services/user.services");
const httpStatus = require("http-status");

/**
 *==============================================*
    Generate JWT Token
 *==============================================*
 */
generateToken = (user) => {
  return JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
      // exp: Math.floor(Date.now() / 1000) + 30
    }
  );
};

/**
 *==============================================*
            Signup User
 *==============================================*
 */
module.exports.signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const user = userServices.getUserByEmail();
  // Check if there is a user with the same email
  const foundUser = await User.findOne({ "local.email": email });
  if (foundUser) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Email is already in use" });
  }
  // Create a new user
  const newUser = new User({
    _id: mongoose.Types.ObjectId(),
    method: "local",
    local: {
      email: email,
      password: password,
    },
  });
  await newUser.save();
  // Generate the token
  const token = generateToken(newUser);

  // Respond with token
  res.status(200).json({
    token: token,
    id: newUser._id,
    method: newUser.method,
  });
};
/**
 *==============================================*
            SignIn User
 *==============================================*
 */
module.exports.signIn = async (req, res, next) => {
  // Generate token
  const token = generateToken(req.user);
  // the changes are made here 9/18/2019

  res.status(200).json({
    token: token,
    id: req.user._id,
    method: req.user.method,
  });
};
/**
 *==============================================*
    Signup User Using Google Auth and Send Token
 *==============================================*
 */
module.exports.googleOAuth = async (req, res, next) => {
  //console.log(req.user)
  // Generate token
  const token = generateToken(req.user);
  res.status(200).json({
    token: token,
    id: req.user._id,
    method: req.user.method,
    statusCode:httpStatus.OK
  });
};
/**
 *==============================================*
    Signup User Using Facebook Auth and Send Token
 *==============================================*
 */
module.exports.facebookOAuth = async (req, res, next) => {
  // Generate token
  const token = generateToken(req.user);
  res.status(200).json({
    token: token,
    id: req.user._id,
    method: req.user.method,
  });
};
