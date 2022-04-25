const songValidate = (req, res, next) => {
    let song = req.body;
    let properties = [
        { name: "title", type: "string" },
        { name: "album", type: "string" },
        { name: "artist", type: "string" },
        { name: "genre", type: "string" },
        { name: "releaseDate", type: "string" }
    ];

    for (const property of properties) {
        if (
            song.hasOwnProperty(property.name) &&
            typeof (song[property.name] === property.type)
        ) {
            continue;
        } else {
            return res.status(403).send('Song body is not valid!');
        }
    }
    return next();
}


module.exports = songValidate;
