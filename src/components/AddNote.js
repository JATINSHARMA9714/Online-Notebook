import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

export default function AddNote(props) {
  const {showAlert}=props
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description);
        setNote({title:"",description:""})
        showAlert("Note Added","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div>
      <h1 className='py-3 text-light'>Add a Note</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label text-light">Title</label>
    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" minLength={3} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label text-light">Description</label>
    <textarea type="text" className="form-control " value={note.description} id="description" name='description' minLength={5} onChange={onChange}/>
  </div>
  <button type="submit" disabled={note.title<3 || note.description<5} className="btn btn-dark text-light" onClick={handleClick}>Add Note</button>
</form>
    </div>
  )
}
