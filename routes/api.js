/**
 * API resources definition
 */
var express = require('express');
var router = express.Router({ mergeParams: true });

var usersRoutes = require('./api/users');
var widgetsRoutes = require('./api/widgets');

router.use('/users', usersRoutes);
router.use('/widgets', widgetsRoutes);

module.exports = {
    register: function registerRoute(app) {
        app.use('/api', router);
    }
};
