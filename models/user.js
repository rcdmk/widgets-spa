/**
 * User model
 */
var users = require('../src/data/users');

module.exports = (function UserModel() {
    return {
        getAll: function getAllUsers() {
            return new Promise((resolve, reject) => {
            	setImmediate(() => resolve(users));
            });
        },

        getById: function getUserById(id) {
            return new Promise((resolve, reject) => {
            	setImmediate(() => resolve(users.filter((u, i) => u.id == id)[0]));
            });
        }
    };
})();
