/**
 * Widgets API actions definition
 */
var widgetsModel = require('../../models/widget');

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

    if (!widget.price) {
      addValidationError('price', 'Price is required!');
    } else if (isNaN(parseFloat(widget.price))) {
      addValidationError('price', 'Price must be a number!');
    }

    if (!widget.color) {
      addValidationError('color', 'Color is required!');
    }

    if (String(widget.melts) !== 'true' && String(widget.melts) !== 'false') {
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

  // public
  return {
    listWidgets: function listWidgets(req, res) {
      const widgets = widgetsModel.getAll()
        .then((widgets) => res.send(widgets))
        .catch((err) => res.sendStatus(500));
    },

    getWidgetById: function getWidgetById(req, res) {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }

      const id = req.params.id;

      widgetsModel.getById(id)
        .then((widget) => {
          if (!widget) {
            res.sendStatus(404);
          } else {
            res.send(widget);
          }
        })
        .catch((err) => res.sendStatus(500));
    },

    createWidget: function createWidget(req, res) {
      if (!req.body) {
        return res.sendStatus(400);
      }

      if (!validateWidget(req.body)) {
        return res.status(422).send({
          message: 'Validation errors',
          errors: validationErrors
        });
      }

      const widget = widgetsModel.mapObjectToWidget(req.body);

      widgetsModel.add(widget)
        .then((widget) => {
          res.status(201).send(widget);
        })
        .catch((err) => res.sendStatus(500));
    },

    editWidget: function editWidget(req, res) {
      if (!req.params.id || isNaN(parseInt(req.params.id)) || !req.body) {
        return res.sendStatus(400);
      }

      if (!validateWidget(req.body)) {
        return res.status(422).send({
          message: 'Validation errors',
          errors: validationErrors
        });
      }

      const id = req.params.id;

      widgetsModel.getById(id)
        .then((existingWidget) => {
          if (!existingWidget) {
            return Promise.reject(() => res.sendStatus(404));
          }

          const widget = widgetsModel.mapObjectToWidget(req.body);
          widget.id = id;

          return widgetsModel.update(widget);
        })
        .then((widget) => res.send(widget))
        .catch((err) => res.sendStatus((err && err.status) || 500));
    }
  };
}

module.exports = WidgetsController();
