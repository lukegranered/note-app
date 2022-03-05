const fs = require('fs');
const path = require('path');
const { notes } = require('../../Develop/db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    if (req.query) {
        res.send(notes);
    }
});

function createNewNote(body, noteList) {
    const note = body;
    noteList.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../Develop/db/db.json'),
        JSON.stringify({ notes: noteList }, null, 2)
    );
    return note;
}

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    console.log(note);
    res.json(note);

});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const deleteNote = notes.findIndex((note) => {
        return note.id === id;
    });
    
    const deleted = notes.splice(deleteNote, 1);
    res.json(deleted);
})

module.exports = router;