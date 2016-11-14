/**
 * API route definition
 */
var express = require('express');
var router = express.Router();

var usersController = require('../controllers/api/usersController');

/* GET users listing. */
router.get('/users', usersController.listUsers);


module.exports = router;
