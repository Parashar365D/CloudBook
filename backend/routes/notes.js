const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Route 1: Get Entire notes using: Get resquest /api/notes/fetchEnotes 
router.get('/fetchEnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) { res.status(500).send("Internal Server Error"); }
});
// Route 2: Add New Notes using: Post resquest /api/notes/addnote 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title, title must contain 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //  Errors handling - bad resquest   
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const note = new Note({ user: req.user.id, title, description, tag });
        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) { res.status(500).send("Internal Server Error"); }
});

// Route 3: Update Notes using: put resquest /api/notes/updatenote 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title; };
        if (description) { newNote.description = description; };
        if (tag) { newNote.tag = tag; };

        //  Find note for update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        if (note.user.toString() != req.user.id) { return res.status(401).send("Not Allowed"); }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) { res.status(500).send("Internal Server Error"); }

});


// Route 4: Delete Notes using: delete resquest /api/notes/deletenote 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //  Find note for delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        // delete exists note if user owns it
        if (note.user.toString() != req.user.id) { return res.status(401).send("Not Allowed"); }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) { res.status(500).send("Internal Server Error"); }
});

module.exports = router;