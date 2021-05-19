const fs = require('fs');
let noteData = require('../db/db.json');
const path = require('path');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(noteData));
    app.post('/api/notes', (req, res) => {
        let id = noteData.length + 1;
        req.body.id = id
        noteData.push(req.body);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData))
        res.json(true);
    })
    app.delete('/api/notes/:id', (req, res) => {
        let filterNote = noteData.filter(note => {
            return (note.id != req.params.id)
        })
        noteData = filterNote
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(filterNote))
        res.json(true)
    })
};
