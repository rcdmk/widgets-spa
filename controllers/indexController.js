/**
 * Index App resources definition
 */

/* GET home page */
function IndexController () {
  return {
    showDashboard: function showDashboard(req, res) {
      res.render('index', {
        title: 'Dashboard',
        content: '',              // page content
        state: JSON.stringify({}) // current app state
      });
    }
  };
}

module.exports = IndexController();
