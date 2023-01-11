

module.exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email })
}
