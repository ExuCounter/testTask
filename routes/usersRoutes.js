// Express
const express = require('express');
const usersRouter = express.Router();
// Users Controller
const usersController = require('../controllers/usersController');
const { getListOfUsers } = usersController;
const { query, validationResult } = require('express-validator');

usersRouter.get('/', [
    query('offset').if((offset) => offset !== undefined).isNumeric()
], (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new Error('Invalid offset ( not a number )');
        getListOfUsers(req, res, next);
    } catch (error) {
        console.error(error.message);
        res.status(400).send([]);
    }
});

module.exports = usersRouter;