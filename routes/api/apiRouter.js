// Express
const express = require('express');
const apiRouter = express.Router();
// API Controller ( current version )
const apiController = require('../../controllers/api/v1/apiController');
const { getListOfUsers } = apiController;

apiRouter.get('/', getListOfUsers)

module.exports = apiRouter;