// Express
const express = require('express');
const usersRouter = express.Router();
// Users Controller
const usersController = require('../controllers/usersController');
const { getListOfUsers } = usersController;

usersRouter.get('/', (res, req, next) => {
    res.redirect('/get-list-of-users');
    next();
})

usersRouter.get('/get-list-of-users', getListOfUsers);

module.exports = usersRouter;