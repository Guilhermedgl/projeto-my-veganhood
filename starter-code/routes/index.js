const express = require('express');

const router  = express.Router();

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

// GET mainpage with guest link
router.get('/mainpage', (req, res) => {
  res.render('../views/mainpage.hbs');
});

//router to add restaurants
router.get('/rest-add', (req, res) => {
  res.render('../views/rest-add.hbs');
});

module.exports = router;
