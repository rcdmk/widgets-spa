/**
 * API resources definition
 */
var express = require('express');
var router = express.Router({ mergeParams: true });
var debug = require('debug')('widgets-spa:api');

var usersRoutes = require('./api/users');
var widgetsRoutes = require('./api/widgets');

router.use('/users', usersRoutes);
router.use('/widgets', widgetsRoutes);

// API 404 - Not Found handler
router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// API error handler
router.use((err, req, res, next) => {
    debug(err);
    if (err.message) {
        res.status(err.status || 500).send(err.message);
    } else {
        res.sendStatus(err.status || 500);
    }
});

module.exports = {
    register: function registerRoute(app) {
        app.use('/api', router);
    }
};
