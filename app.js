// Express
const express = require('express');
const app = express();
// Config
const config = require('config');
const PORT = config.get('PORT');
// File System
const fs = require('fs');
// Routes
const usersRouter = require('./routes/usersRoutes');
// Fetch
global.fetch = require('node-fetch');
// Cache middleware
const { updateCache } = require('./middlewares/cacheMiddleware');
// Cache middleware
app.use(updateCache);
// Users Router middleware
app.use('/', usersRouter)

// Listen port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})