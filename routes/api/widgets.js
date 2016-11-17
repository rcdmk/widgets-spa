/**
 * API route definition
 */
var express = require('express');
var router = express.Router({ mergeParams: true });

var widgetsController = require('../../controllers/api/widgetsController');

/* GET widgets listing. */
router.get('/', widgetsController.listWidgets);

/* GET widget by id */
router.get('/:id', widgetsController.getWidgetById);

/* POST (create) widget */
router.post('/', widgetsController.createWidget);

module.exports = router;
