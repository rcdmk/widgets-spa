/**
 * Index App resources definition
 */
/* GET home page */
function IndexController () {
  var state = {};
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
