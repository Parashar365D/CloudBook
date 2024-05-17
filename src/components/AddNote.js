import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully", 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-sm my-3" style={{width:"100vmin"}}>
            <form className='addNote1' onSubmit={handleclick}>
                <h2>Add Your Note</h2>
                <div className="row ">
                    <div className="col-sm-8 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title :-</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={3} onChange={onChange} required/>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Tag :-</label>
                        <input type="tag" className="form-control" id="tag" name='tag' value={note.tag} minLength={2} onChange={onChange} required/>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Day & Date :-</label>
                        <input type="datetext" className="form-control" id="date" name='date' value={new Date().toDateString()} disabled />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description :-</label>
                    <textarea className="form-control" id="description" name='description' value={note.description} rows="4" minLength={5} onChange={onChange} required />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-default border border-secondary" style={{width:"30%"}}>Save Note</button>
                </div>
            </form>
        </div>
    );
}

export default AddNote;
