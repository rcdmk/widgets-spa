/**
 * Users API actions definition
 */
var usersModel = require('../../models/user');

/* GET users listing */
function UsersController() {
  return {
    listUsers: function listUsers(req, res) {
      const users = usersModel.getUsers();

      res.send(users);
    },
    getUserById: function getUserById(req, res) {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }
      
      const id = req.params.id;

      const user = usersModel.getById(id);

      if (!user) {
        res.sendStatus(404);
      } else {
        res.send(user);
      }
    }
  };
}

module.exports = UsersController();
