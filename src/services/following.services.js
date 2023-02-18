const User = require("../models/user.model");
module.exports.checkFollowingById = async (userId, followingUserId) => {
  return await User.findOne({
    _id: userId,
    "following.userId": followingUserId,
  });
};
module.exports.followUser = async (firstUserId, secondUserId) => {
  /**
   * Update First User
   * Update Second User
   */
  await User.findOneAndUpdate(
    { _id: firstUserId },
    { $push: { following: { userId: secondUserId } } }
  );
  await User.findOneAndUpdate(
    { _id: followingUserId },
    { $push: { followers: { userId: firstUserId } } }
  );
};
module.exports.unFfollowUser = async (firstUserId, secondUserId) => {
    /**
     * Update First User
     * Update Second User
     */
    await User.findOneAndUpdate(
      { _id: firstUserId },
      { $pull: { following: { userId: secondUserId } } }
    );
    await User.findOneAndUpdate(
      { _id: followingUserId },
      { $pull: { followers: { userId: firstUserId } } }
    );
  };
