const express = require('express');
const router  = express.Router();

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

module.exports = router;
