/**
 * Widgets API actions definition
 */
var widgets = require('../../src/data/widgets');

/* GET widgets listing */
function WidgetsController() {
  return {
    listWidgets: function listWidgets(req, res) {
      res.send(widgets);
    },
    getWidgetById: function getWidgetById(req, res) {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }
      
      const id = req.params.id;

      const widget = widgets.filter((u, i) => u.id == id)[0];

      if (!widget) {
        res.sendStatus(404);
      } else {
        res.send(widget);
      }
    }
  };
}

module.exports = WidgetsController();
