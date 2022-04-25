const path = require('path');
const express = require('express');
const cors = require('cors');
const repoContext = require('./repository/repository-wrapper');
const productValidate = require('./middleware/product-validation');
const productLogger = require('./middleware/product-logger');
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

// GET all products.
// http://localhost:5005/products
app.get('/api/products', (req, res) => {
    const products = repoContext.products.findAllProducts();

    return res.send(products);
});

// GET all songs.
// http://localhost:5005/songs
app.get('/api/songs', (req, res) => {
    const songs = repoContext.songs.findAllSongs();

    return res.send(songs);
});


// GET product by id.
// http://localhost:5005/products/:id
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = repoContext.products.findProductById(id);

    return res.send(product);
});

// GET song by id.
// http://localhost:5005/songs/:id
app.get('/api/songs/:id', (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);

    return res.send(song);
});


// POST new product.
// http://localhost:5005/products
app.post('/api/products', [productLogger, productValidate], (req, res) => {
    const newProduct = req.body;
    const addedProduct = repoContext.products.createProduct(newProduct);

    return res.status(201).send(addedProduct);
});

// POST new song.
// http://localhost:5005/songs
app.post('/api/songs', [songLogger, songValidate], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);

    return res.status(201).send(addedSong);
});


// PUT update product.
// http://localhost:5005/products/:id
app.put('/api/products/:id',[productValidate], (req, res) => {
    const id = parseInt(req.params.id);
    const productPropertiesToModify = req.body;
    const productToUpdate = repoContext.products.updateProduct(id, productPropertiesToModify);

    return res.send(productToUpdate);
});

// PUT update song.
// http://localhost:5005/songs/:id
app.put('/api/songs/:id',[songValidate], (req, res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);

    return res.send(songToUpdate);
});


// DELETE product.
// http://localhost:5005/products/:id
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedProduct = repoContext.products.deleteProduct(id);

    return res.send(deletedProduct);
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
