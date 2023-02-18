const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require("mongoose");
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.oauth_google_clientID, // Your Credentials here.
      clientSecret: process.env.oauth_google_clientSecret, // Your Credentials here.
      callbackURL: "http://localhost:8080/auth/callback",
      passReqToCallback: false,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Should have full user profile over here
        // console.log('profile', profile);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        // the changes are made here 9/18/2019
        const newUser = new User({
          _id: mongoose.Types.ObjectId(),
          method: "google",
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profilePic: profile.photos[0].value,
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.use(new FacebookStrategy({
  clientID: process.env.oauth_google_clientID,
  clientSecret: process.env.oauth_google_clientSecret,
  callbackURL: "http://localhost:8080/auth/callback"
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile)
  return done(null, profile);
}
));
