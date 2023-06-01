import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const navigate=useNavigate();
  const {showAlert}=props
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({ id:"",edittitle: "", editdescription: "" })
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose=useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,edittitle:currentNote.title,editdescription:currentNote.description});
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
  const handleClick=(e)=>{
    refClose.current.click();
    e.preventDefault();
    editNote(note.id,note.edittitle,note.editdescription);
    showAlert("Note Updated","success")
}
  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary my-3 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="edittitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="edittitle" name='edittitle' value={note.edittitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="form-label">Description</label>
                  <textarea type="text" className="form-control " id="editdescription" value={note.editdescription} name='editdescription' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button"ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.edittitle<3 || note.editdescription<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container row'>
        <h2 className='my-3 text-light'>Your Notes</h2>
        <div className="container text-light">
          {notes.length===0 && "No Notes To Display"}
        </div>
        {notes.map((ele) => {
          return <div className="key col-md-3" key={ele._id}><NoteItem element={ele} updateNote={updateNote} showAlert={showAlert} /></div>
        })}
      </div>
    </>
  )
}
