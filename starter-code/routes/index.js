const express = require('express');

const router = express.Router();
const passport = require('passport');

const Restaurant = require('../models/restaurant');

/* GET home page */
router.get('/', (req, res, next) => {
  Restaurant.find({}, (error, restaurants) => {
    if (error) {
      next(error);
    } else {
      res.render('index', { restaurants });
    }
  });
});

// GET main with guest link
router.get('/main', (req, res) => {
  console.log(req.newUser)
  res.render('home');
  console.log(req.user);
});

router.get('/privacy', (req, res) => {
  res.render('privacy');
});

// route to add restaurants
router.get('/rest-add', (req, res) => {
  res.render('rest-add');
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

module.exports = router;
