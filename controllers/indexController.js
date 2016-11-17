/**
 * Index App resources definition
 */
const users = require('../src/data/users');
const widgets = require('../src/data/widgets');

/* GET home page */
function IndexController () {
  var state = {
    users: users,
    widgets: widgets
  };
  
  var content = '';

  return {
    showDashboard: function showDashboard(req, res) {
      res.render('index', {
        title: 'Dashboard',
        content: content,             // page content
        state: JSON.stringify(state)  // current app state
      });
    }
  };
}

module.exports = IndexController();
