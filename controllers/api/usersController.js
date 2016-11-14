/**
 * Users API resources definition
 */

/* GET users listing */
function UsersController() {
  return {
    listUsers: function listUsers(req, res) {
      res.send([]);
    }
  };
}

module.exports = UsersController();
