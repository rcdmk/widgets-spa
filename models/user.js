/**
 * User model
 */
var users = require('../src/data/users');

module.exports = (function UserModel() {
    return {
        getAll: function getAllUsers() {
            return users;
        },

        getById: function getUserById(id) {
            return users.filter((u, i) => u.id == id)[0];
        }
    };
})();