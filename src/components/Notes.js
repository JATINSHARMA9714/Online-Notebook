import React,{useContext} from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem';

export default function Notes() {
    const context=useContext(NoteContext);
  const {notes,setNotes}=context;
  return (
    <div className='container row'>
      <h2 className='my-3'>Your Notes</h2>
      {notes.map((ele)=>{
        return <NoteItem element={ele} key={ele.id}/>
      })}
    </div>
  )
}
