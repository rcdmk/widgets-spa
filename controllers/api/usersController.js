/**
 * Users API resources definition
 */
var users = require('../../src/data/users');

/* GET users listing */
function UsersController() {
  return {
    listUsers: function listUsers(req, res) {
      res.send(users);
    }
  };
}

module.exports = UsersController();
