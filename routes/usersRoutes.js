// Express
const express = require('express');
const usersRouter = express.Router();
// Users Controller
const usersController = require('../controllers/usersController');
const { getListOfUsers } = usersController;
// Update Cache
const { updateCache } = require('../middlewares/cacheMiddleware');

usersRouter.get('/', updateCache, getListOfUsers);

module.exports = usersRouter;