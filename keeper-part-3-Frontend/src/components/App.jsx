import React, {useState} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import axios from "axios"

let flag = true

function App() {
    const [notes, setNotes] = useState([])

    if (flag) {
        flag = !flag
        updateUI()
    }

    function addNote(newNote) {
        axios.post("http://localhost:3001/notes", newNote)
            .then(() => {
                console.log("Note added successfully!")
            })
            .then(() => {updateUI()})
    }

    function deleteNote(id) {
        axios.delete("http://localhost:3001/notes/" + id)
            .then(r => {
                console.log(r)
            })
            .then(() => {
                updateUI()
            })
        // updateUI()
    }

    axios.get("http://localhost:3001", {
        withCredentials: true
    })

    function updateUI() {
        axios.get("http://localhost:3001/notes")
            .then(r => {
                setNotes(r.data)
                console.log("UI Updated")
            })
    }

    return (
        <div>
            <Header/>
            <CreateArea onAdd={addNote}/>
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={noteItem._id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                )
            })}
            <Footer/>
        </div>
    )
}

export default App
