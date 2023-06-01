import React, { useContext } from 'react'
// import EditIcon from '@mui/icons-material/Edit';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "../App.css"
import NoteContext from '../context/NoteContext';

export default function NoteItem(props) {
  const {showAlert}=props
  const { element,updateNote } = props;
  const context=useContext(NoteContext);
  const {deleteNote}=context;
  return (
    <>
    <div className=' my-3'>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{element.title}</h5>
          <p className="card-text">{element.description}</p>
          <EditIcon className='point' fontSize='medium' onClick={()=>{
            updateNote(element)}}/>
          <DeleteForeverIcon className=' point mx-2' fontSize='small' onClick={()=>{deleteNote(element._id)
          showAlert("Note Deleted","success")}}/>
        </div>
      </div>
    </div>
    </>
  )
}
