const express = require('express');
const router = express.Router();
const passport = require('passport');
const Restaurant = require('../models/restaurant');

/* GET home page */
router.get('/', (req, res, next) => {
  const user = req.user;
  Restaurant.find({}, (error, restaurants) => {
    if (error) {
      next(error);
    } else {
      console.log('@@', user)
      res.render('index', { restaurants, user });
    }
  });
});

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

// route to add restaurants
router.use((req, res, next) => {
  console.log('in session', req.session)
  if (req.session.currentUser) {
    next();
  } else {
    console.log("Please login")
    res.redirect("/");
  }
});
router.get('/rest-add', (req, res) => {
  res.render('rest-add');
});
module.exports = router;
