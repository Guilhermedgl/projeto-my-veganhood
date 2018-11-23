const passport = require("passport");
const User = require("../models/user");
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


//Facebook social login
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOKID,
    clientSecret: process.env.FACEBOOKSECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback", 
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {
    User.findOne({ facebookID: profile.id }, function (err, user) {
      if (err) {
        return done (err);
      }
      if (!user) {
        newUser = new User ({
          name: profile.displayName,
          facebookID: profile.id
        });
        newUser.save(function(err){
          req.session.currentUser = user;
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        req.session.currentUser = user;
        return done(err, user)
      }
    });
  }
));

// Google social login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLEID,
  clientSecret: process.env.GOOGLESECRET,
  callbackURL: "/auth/google/callback", 
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  User.findOne({ googleID: profile.id }, function (err, user) {
    if (err) {
      console.log(req.user, req.profile)
      return done (err);
    }
    if (!user) {
      console.log(req.user)
      newUser = new User ({
        name: profile.displayName,
        googleID: profile.id
      });
      newUser.save(function(err){
        req.session.currentUser = user;
        if (err) console.log(err);
        return done(err, user);
      });
    } else {
      req.session.currentUser = user;
      return done(err, user)
    }
  });
}
));