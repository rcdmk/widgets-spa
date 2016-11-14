/**
 * Index route definition
 */
var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.showDashboard);

module.exports = router;
