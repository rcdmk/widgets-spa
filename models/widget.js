/**
 * Widget model
 */
var widgets = require('../src/data/widgets');

module.exports = (function WidgetModel() {
    function getNextId() {
        const ids = widgets.map((w, i) => w.id);

        return ids.reduce(function (p, v) {
        return p > v ? p : v;
        }) + 1;
    }

    return {
        mapObjectToWidget: function mapObjectToWidget(object) {
            if (object) {
                return {
                    name: object.name,
                    price: parseFloat(object.price).toFixed(2),
                    color: object.color,
                    melts: String(object.melts) === 'true',
                    inventory: parseInt(object.inventory)
                };
            }
        },

        getAll: function getAllWidgets() {
            return widgets;
        },

        getById: function getWidgetById(id) {
            return widgets.filter((w, i) => w.id == id)[0];
        },

        add: function addWidget(widget) {
            widget.id = getNextId();

            widgets.push(widget);

            return widget;
        },

        update: function updateWidget(widget) {
            const widgetToEdit = this.getById(widget.id);

            if (widgetToEdit) {
                widgetToEdit.name = widget.name;
                widgetToEdit.color = widget.color;
                widgetToEdit.price = widget.price;
                widgetToEdit.melts = widget.melts;
                widgetToEdit.inventory = widget.inventory;
            }

            return widgetToEdit;
        }
    };
})();