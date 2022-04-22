const path = require('path');
const express = require('express');             // Bring in Express framework.


// Initialize Express framework save to constant 'app'.
const app = express();

// Middleware.
app.use(express.json);


// Define routes.
app.post('/', (req, res) => {
    console.log('Incoming request:', req.body);
    res.sendStatus(200);
});


// Check to see if PORT is already assigned, if not use 5000.
const PORT = process.env.PORT || 5005;
// Start Express web server, listen on assigned port.
app.listen(PORT, () => {
    console.log(`Express Server up and listening at http://localhost:${PORT}`);
});


// Use npm run dev command in terminal to start dev server.