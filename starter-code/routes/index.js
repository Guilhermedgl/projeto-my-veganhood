const express = require('express');
const router  = express.Router();
const passport = require("passport");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET mainwith guest link
router.get('/main', (req, res) => {
  res.render('../views/home');
});

router.get('/privacy', (req, res) => {
  res.render('../views/privacy');
});

//route to add restaurants
router.get('/rest-add', (req, res) => {
  res.render('../views/rest-add.hbs');
});

//route social login with Facebook
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/main');
  });


module.exports = router;
