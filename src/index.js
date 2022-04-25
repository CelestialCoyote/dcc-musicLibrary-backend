const path = require('path');
const express = require('express');
const cors = require('cors');
const repoContext = require('./repository/repository-wrapper');
const songValidate = require('./middleware/song-validation');
const songLogger = require('./middleware/song-logger');


// Initialize Express framework save to constant 'app'.
const app = express();

// Middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Define routes/ endpoints.
// Base URL http://locatlhost:5005
app.get('/', (req, res) => {
    console.log(req.body);

    return res.send('Response from the express server base URL.');
});


// GET all songs.
// http://localhost:5005/songs
app.get('/api/songs', (req, res) => {
    const songs = repoContext.songs.findAllSongs();

    return res.send(songs);
});


// GET song by id.
// http://localhost:5005/songs/:id
app.get('/api/songs/:id', (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);

    return res.send(song);
});


// POST new song.
// http://localhost:5005/songs
app.post('/api/songs', [songLogger, songValidate], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);

    return res.status(201).send(addedSong);
});


// PUT update song.
// http://localhost:5005/songs/:id
app.put('/api/songs/:id',[songValidate], (req, res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);

    return res.send(songToUpdate);
});


// DELETE song.
// http://localhost:5005/songs/:id
app.delete('/api/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedSong = repoContext.songs.deleteSong(id);

    return res.send(deletedSong);
});


// Check to see if PORT is already assigned, if not use 5000.
const PORT = process.env.PORT || 5005;
// Start Express web server, listen on assigned port.
app.listen(PORT, () => {
    console.log(`Express Server up and listening at http://localhost:${PORT}`);
});


// Use npm run dev command in terminal to start dev server.
