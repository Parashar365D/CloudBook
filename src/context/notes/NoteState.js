import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    // Ftech all notes for user in card formate
    const FetchNote = async () => {

        const response = await fetch(`${host}/api/notes/fetchEnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add notes
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // Edit notes
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        setNotes(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };
    
    // Delete notes
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, FetchNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;