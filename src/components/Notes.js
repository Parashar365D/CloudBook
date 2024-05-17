import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, FetchNote, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        props.setProgress(50);
        if (localStorage.getItem('token')) {
            FetchNote();
        }
        else {
            navigate("/login");
        }
        props.setProgress(100);
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    };

    const handleclick = (e) => {
        props.setProgress(50);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", 'success');
        props.setProgress(100);
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote setProgress={props.setProgress} showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal-dialog modal-dialog-centered">
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 ms-auto" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='addNote1'>
                                    <div className="row">
                                        <div className="col-md-10 mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Title :-</label>
                                            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} minLength={3} onChange={onChange} required />
                                        </div>
                                        <div className="col-sm-5 mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Tag :-</label>
                                            <input type="tag" className="form-control" id="etag" name='etag' value={note.etag} minLength={2} onChange={onChange} required />
                                        </div>
                                        <div className="col-sm-5 mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Day & Date :-</label>
                                            <input type="datetext" className="form-control" id="date" name='date' value={new Date().toDateString()} disabled />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description :-</label>
                                        <textarea className="form-control" id="edescription" name='edescription' rows="4" minLength={5} value={note.edescription} onChange={onChange} required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default border border-secondary mx-auto" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-default border border-secondary mx-auto" onClick={handleclick}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container my-3">
                <h2>Your Notes</h2>

                <div className="row">
                    {Array.isArray(notes) && notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                        ))) : (<div className="container text-center">Please Add some Note, Notes will display here</div>)
                    }
                </div>
            </div>
        </>
    );
};

export default Notes;
