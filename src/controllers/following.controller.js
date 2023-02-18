const userServices = require("../services/user.services");
const followingServices = require("../services/following.services");

module.exports.followUser = async (req, res) => {
  const userId = req.user._id;
  const followingUserId = req.body.userId;
  const alreadyFollowing = await followingServices.checkFollowingById(
    userId,
    followingUserId
  );
  if (alreadyFollowing) {
    return res.status(400).json({
      message: "You alreadt following this user",
    });
  }
  await followingServices.followUser(userId,followingUserId)

};
module.exports.unFollowUser = async (req, res) => {
    const userId = req.user._id;
    const unFollowingUserId = req.body.userId;
    const alreadyFollowing = await followingServices.checkFollowingById(
      userId,
      unFollowingUserId
    );
    if (alreadyFollowing) {
      return res.status(400).json({
        message: "You alreadt following this user",
      });
    }
    await followingServices.unFfollowUser(userId,unFollowingUserId)

};
