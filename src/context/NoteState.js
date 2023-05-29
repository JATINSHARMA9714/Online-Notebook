import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState=(props)=>{
    const detail=[
        {
            id: "6474633a40881e5cad041fe7",
            user: "646f746a401a89df008477cf",
            title: "jatin",
            description: "Earphones Not Found",
            date: "2023-05-29T08:32:58.626Z",
            __v: 0
        },
        {
            id: "6474633a40881e5cad041fe7",
            user: "646f746a401a89df008477cf",
            title: "jatin",
            description: "Earphones Not Found",
            date: "2023-05-29T08:32:58.626Z",
            __v: 0
        },
        {
            id: "6474633a40881e5cad041fe7",
            user: "646f746a401a89df008477cf",
            title: "jatin",
            description: "Earphones Not Found",
            date: "2023-05-29T08:32:58.626Z",
            __v: 0
        }
    ]
    const [notes,setNotes]=useState(detail);

    //checking context 

    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"rahul",
    //             "class":"12"
    //         })
    //     }, 1000);
    return(
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}
export default NoteState;