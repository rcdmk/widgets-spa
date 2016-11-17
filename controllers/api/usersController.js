/**
 * Users API actions definition
 */
var usersModel = require('../../models/user');

/* GET users listing */
function UsersController() {
  return {
    listUsers: function listUsers(req, res) {
      usersModel.getAll()
        .then((users) => res.send(users))
        .catch((err) => res.sendStatus(500));
    },
    getUserById: function getUserById(req, res) {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }

      const id = req.params.id;

      usersModel.getById(id)
        .then((user) => {
          if (!user) {
            res.sendStatus(404);
          } else {
            res.send(user);
          }
        })
        .catch((err) => res.sendStatus(500));
    }
  };
}

module.exports = UsersController();
