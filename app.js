// Express
const express = require('express');
const app = express();
// Config
const config = require('config');
const PORT = config.get('PORT');
// Routes
const apiRouter = require('./routes/api/apiRouter');

// API Router middleware
app.use('/api/v1', apiRouter)

// Listen port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})