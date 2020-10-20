// Express
const express = require('express');
const usersRouter = express.Router();
// Users Controller
const usersController = require('../controllers/usersController');
const { getListOfUsers } = usersController;

// Temporary redirect
usersRouter.get('/', (req, res, next) => {
    res.redirect('/get-list-of-users', 301);
    next();
})

usersRouter.get('/get-list-of-users', getListOfUsers);

module.exports = usersRouter;