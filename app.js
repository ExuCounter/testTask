// Express
const express = require('express');
const app = express();
// Config
const config = require('config');
const PORT = config.get('PORT');



// Listen port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})