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
            return new Promise((resolve, reject) => {
                setImmediate(() => resolve(widgets));
            });
        },

        getById: function getWidgetById(id) {
            return new Promise((resolve, reject) => {
                setImmediate(() => {
                    const widget = widgets.filter((w, i) => w.id == id)[0];
                    resolve(widget);
                });
            });
        },

        add: function addWidget(widget) {
            return new Promise((resolve, reject) => {
                widget.id = getNextId();

                widgets.push(widget);

                setImmediate(() => resolve(widget));
            });
        },

        update: function updateWidget(widget) {
            return new Promise((resolve, reject) => {
                this.getById(widget.id)
                    .then((widgetToEdit) => {
                        if (widgetToEdit) {
                            widgetToEdit.name = widget.name;
                            widgetToEdit.color = widget.color;
                            widgetToEdit.price = widget.price;
                            widgetToEdit.melts = widget.melts;
                            widgetToEdit.inventory = widget.inventory;
                        }

                        setImmediate(() => resolve(widgetToEdit));
                    })
                    .catch(reject);
            });
        }
    };
})();
