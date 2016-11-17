/**
 * API route definition
 */
var express = require('express');
var router = express.Router({ mergeParams: true });

var usersController = require('../../controllers/api/usersController');

/* GET users listing. */
router.get('/', usersController.listUsers);

/* GET user by id */
router.get('/:id', usersController.getUserById);


module.exports = router;
