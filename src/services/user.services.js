const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const User = require('../models/user.model');

module.exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email })
}
module.exports.signUp = async (bodyData) => {
    return await User.create(bodyData)
}
module.exports.signIn = async (user) => {
    let data = {
        _id: user._id,
        email: user.email,
    }
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
    return token;
}
module.exports.updateUser = async (userId, updateData) => {
    return await User.findOneAndUpdate({ _id: userId }, { updateData })
}