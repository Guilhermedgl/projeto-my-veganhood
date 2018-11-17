const express = require('express');
const router  = express.Router();
const passport = require("passport");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET mainpage with guest link
router.get('/mainpage', (req, res) => {
  res.render('../views/mainpage.hbs');
});

//router to add restaurants
router.get('/rest-add', (req, res) => {
  res.render('../views/rest-add.hbs');
});

//route social login with Google
router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "../views/mainpage.hbs"
}));

module.exports = router;
