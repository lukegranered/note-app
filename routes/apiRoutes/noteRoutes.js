const { handleNoteSave } = require('../../Develop/public/assets/js/index');
const notes = require('../../Develop/db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    if (req.query) {
        res.send(notes);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if(req.body) {
        const note = handleNoteSave(req.body, notes);
        res.json(note);
    }
});

module.exports = router;