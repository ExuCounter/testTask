// Express
const express = require('express');
const usersRouter = express.Router();
// Users Controller
const usersController = require('../controllers/usersController');
const { getListOfUsers } = usersController;

usersRouter.get('/', getListOfUsers)

module.exports = usersRouter;