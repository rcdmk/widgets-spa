/**
 * API route definition
 */
var express = require('express');
var router = express.Router();

var usersController = require('../../controllers/api/usersController');

/* GET users listing. */
router.get('/users', usersController.listUsers);

/* GET user by id */
router.get('/users/:id', usersController.getUserById);


module.exports = router;
