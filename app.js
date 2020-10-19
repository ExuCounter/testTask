// Express
const express = require('express');
const app = express();
// Config
const config = require('config');
const PORT = config.get('PORT');
// Routes
const usersRouter = require('./routes/usersRoutes');
// Fetch
global.fetch = require('node-fetch');

// API Router middleware
app.use('/', usersRouter)

// Listen port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})