const express = require('express');
const router = express.Router();
const passport = require('passport');
const Rest = require('../models/restaurant');


// main with guest link
router.get('/main', (req, res) => {
  const user = req.user;
    Rest.find()
    .then(Rest => {
      res.render('home', { user, Rest });
    })
    .catch(err => {
      console.log(err)
    })
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
// authentication to add restaurants
router.get('/rest-add', (req, res) => {
  if (isLogged(req)) {
    res.render('rest-add');
  } else {
    res.render("index", {err: "Please login with your Facebook or Google account." });
  }
});

// main with logo link
router.get('/', (req, res, next) => {
  if (isLogged(req)) {
    res.redirect('/main');
  } else {
    res.render("index");
  }  
});

router.post('/rest-add', (req, res, done) => {
  console.log("batman")
  Rest.findOne({name: req.body.name}, function(err, rest) {
    console.log(rest)
    if (err) {
      return done (err);
    }
    if (!rest) {
      newRest = new Rest ({
        Name: req.body.name,
        Address: req.body.address,
        Zip: req.body.zip,
        City: 'São Paulo - SP',
        Phone: req.body.phone,
        Email: req.body.email,
        Type: req.body.type
      });
      newRest.save(function(err){
        if (err) console.log(err);
        res.redirect("/rest-add")
        return done(err, rest);
      });
    } else {
      return done(err, rest)
    }
  });
})

module.exports = router;
