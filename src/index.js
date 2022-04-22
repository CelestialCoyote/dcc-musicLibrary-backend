const path = require('path');
const express = require('express');             // Bring in Express framework.
const bodyParser = require('body-parser');      // Use body-parser to parse incoming requests.


// Initialize Express framework save to constant 'app'.
const app = express();
// Check to see if PORT is already assigned, if not use 5000.
const PORT = process.env.PORT || 5000;
// Define path for Express config.
const wwwDirectoryPath = path.join(__dirname, '../www');
// Serve the GUI from the www directory.
app.use(express.static(wwwDirectoryPath));

// Use body-parser to parse incoming string from GUI.
app.use(bodyParser.urlencoded({extended: true}));


// Define routes.
app.post('/', (req, res) => {
    console.log('Incoming request:', req.body);
    res.sendStatus(200);
});


// Start Express web server, listen on assigned port.
app.listen(PORT, () => {
    console.log(`Express Server up and listening at http://localhost:${PORT}`);
});


// Use npm run dev command in terminal to start dev server.