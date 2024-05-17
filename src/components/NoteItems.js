import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='col-md-4'>
            <div className="card mb-3">
                <div className="card-body" style={{ height: "10rem" }}>
                    <h5 className="card-title">{capitalize(note.title)}<i className="fa-regular fa-pen-to-square ms-2" onClick={()=>{updateNote(note)}}></i><i className="fa-solid fa-trash-can ms-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully", 'success')}}></i></h5>
                    <p className="card-text">{capitalize(note.description)}</p>
                </div>  
                    <p className="card-text mb-0"><small className="text-body-secondary mx-2">Tag:- {capitalize(note.tag)}</small></p>
                <div className="card-footer fixed">
                    <p className="card-text date"><small className="text-light">Last updated {new Date(note.date).toDateString()}</small></p>
                </div>
            </div>
        </div>

    );
};

export default NoteItems;
