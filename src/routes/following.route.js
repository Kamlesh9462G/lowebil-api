const express = require("express");
const verifyToken = require("../middlewares/auth");
const followingController = require("../controllers/following.controller");
const router = express.Router();

router.route("/api/v1/follow-user").post(
  verifyToken,
  followingController.followUser
);
router.route("/api/v1/un-follow-user").post(
  verifyToken,
  followingController.unFollowUser
);

module.exports = router;
