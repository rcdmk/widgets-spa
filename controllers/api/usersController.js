/**
 * Users API actions definition
 */
var users = require('../../src/data/users');

/* GET users listing */
function UsersController() {
  return {
    listUsers: function listUsers(req, res) {
      res.send(users);
    },
    getUserById: function getUserById(req, res) {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }
      
      const id = req.params.id;

      const user = users.filter((u, i) => u.id == id)[0];

      if (!user) {
        res.sendStatus(404);
      } else {
        res.send(user);
      }
    }
  };
}

module.exports = UsersController();
