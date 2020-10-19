// Express
const express = require('express');
const usersRouter = express.Router();
// Users Controller
const usersController = require('../controllers/usersController');
const { getListOfUsers } = usersController;

// Temporary redirect to list of users
usersRouter.get('/', (req, res) => {
    res.redirect(301, '/get-list-of-users');
})

usersRouter.get('/get-list-of-users/', getListOfUsers);

module.exports = usersRouter;