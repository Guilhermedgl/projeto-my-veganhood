const passport = require('passport');
require('./serialize');
require('./localStrategy');

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
}