import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const host = "http://localhost:8000"
    const [notes, setNotes] = useState([]);


    //getallnotes
    const getNotes = async() => {
        //localhost:8000/api/notes/createnotes
        const response = await fetch(`${host}/api/notes/getnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        const json=await response.json();
        setNotes(json);
    }

    //Add a Note
    const addNote = async(title,description) => {
        //localhost:8000/api/notes/createnotes
        const response = await fetch(`${host}/api/notes/createnotes`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,description})
        });
        const json=await response.json();
        // console.log(json);
        setNotes(notes.concat(json))
    }
    //Edit a Note

    const editNote = async (id, title, description) => {
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,description})
        });
        const json = await response.json()
        // console.log(json);
        const newNotes=JSON.parse(JSON.stringify(notes))
        //logic to edit notes
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                break;
            }

        }
        setNotes(newNotes);


    }
    //Delete a Note
    const deleteNote = async(id) => {
        //api call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        // console.log(json);
        const newNote = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNote)
        // console.log("Delete Note with id "+id);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes,setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;