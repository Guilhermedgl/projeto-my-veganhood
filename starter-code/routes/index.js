const express = require('express');
const router = express.Router();
const passport = require('passport');
const Restaurant = require('../models/restaurant');


// GET main with guest link
router.get('/main', (req, res) => {
  const user = req.user;
  res.render('home', { user });
});

// destroy session
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    console.log(req.currentUser, 'Session destroyed')
    res.redirect("/");
  });
});

// route social login with Facebook
router.get('/auth/facebook',
passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
(req, res) => {
  res.redirect('/main');
});

// route social login with google
router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read'],
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/main',
}));

function isLogged(req) {
  if (req.session.currentUser) {
    return true;
  }
  return false;
}

router.get('/rest-add', (req, res) => {
  if (isLogged(req)) {
    res.render('rest-add');
  } else {
    res.render("index", {err: "Please login with your Facebook or Google account." });
  }
});

// main page
router.get('/', (req, res, next) => {
  if (isLogged(req)) {
    res.redirect('/main');
  } else {
    res.render("index");
  }  
});
module.exports = router;
