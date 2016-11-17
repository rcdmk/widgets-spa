/**
 * Widgets API actions definition
 */
var widgets = require('../../src/data/widgets');

/* GET widgets listing */
function WidgetsController() {
  // private
  // TODO: Extract validation to middleware
  var validationErrors = [];

  this.addValidationError = function addValidationError(field, message) {
      validationErrors.push({
          'prop': field,
          'message': message
      });
  }

  function validateWidget(widget) {
      validationErrors.length = 0; // empty array

      if (!widget.name) {
        addValidationError('name', 'Name is required!');     
      }
      
      if(!widget.price) {
          addValidationError('price', 'Price is required!');
      } else if (isNaN(parseFloat(widget.price))) {
          addValidationError('price', 'Price must be a number!');
      }
      
      if(!widget.color) {
          addValidationError('color', 'Color is required!');
      }
      
      if(String(widget.melts) !== 'true' && String(widget.melts) !== 'false') {
          addValidationError('melts', 'Melts must be a boolean vale (eg.: true or false)!');
      }
      
      if (!widget.inventory) {
          addValidationError('inventory', 'Inventory is required!');
      } else if (isNaN(parseFloat(widget.inventory))) {
          addValidationError('inventory', 'Inventory must be a number!');
      } else if (parseFloat(widget.inventory) !== parseInt(widget.inventory, 10)) {
          addValidationError('inventory', 'Inventory must be a whole number!');
      }      

      return validationErrors.length === 0;
  }

  function getNextId() {
    const ids = widgets.map((w, i) => w.id);

    return ids.reduce(function (p, v) {
      return p > v ? p : v;
    }) + 1;
  }

  // public
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
    },
    createWidget: function createWidget(req, res) {
      if (!req.body) {
        return res.sendStatus(400);
      }

      if (!validateWidget(req.body)) {
        return res.status(422).send({ message: 'Validation errors', errors: validationErrors });
      }

      const widget = {
        id: getNextId(), // simulate identity
        name: req.body.name,
        price: parseFloat(req.body.price).toFixed(2),
        color: req.body.color,
        melts: req.body.melts,
        inventory: parseInt(req.body.inventory)
      };

      widgets.push(widget);

      res.status(201).send(widget);
    }
  };
}

module.exports = WidgetsController();
