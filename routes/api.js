/**
 * API resources definition
 */
var usersRoutes = require('./api/users');

module.exports = {
    register: function registerRoute(app) {
        app.use('/api', usersRoutes);
    }
};
