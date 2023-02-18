const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const { profileImage } = require("../middlewares/upload");
const userController = require("../controllers/user.controllers");
const passport = require("passport");
require("../config/passport");

router.post("/api/v1/users/signup", userController.signUp);

router.post(
  "/api/v1/users/login",
  passport.authenticate("local", { session: false }),
  userController.signIn
);

// Auth
router.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get('/oauth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));
router.get(
  "/auth/callback",
  userController.googleOAuth
);

// // login Using Google Plus
// router.post('/oauth/google', passport.authenticate('googleToken', { session: false }), userController.googleOAuth);

// // login Using Facebook
// router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), userController.facebookOAuth);

// router.patch("/api/v1/users/:userId", verifyToken, userController.updateUser);
router.post(
  "/api/v1/files",
  profileImage.single("file"),
  verifyToken,
  userController.signIn
);
module.exports = router;
