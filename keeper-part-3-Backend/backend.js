const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cors())
app.use(morgan('dev'))

mongoose.connect(
    "mongodb://localhost:27017/notesDB",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
    .then(() => {
        console.log("MongoDB server up and running on port 27017")
    })

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Note = mongoose.model("Note", noteSchema)

app.route("/")
    .get(function (req, res) {
        res.send("This is a RESTful API server.")
    })

app.route("/notes")
    .get(function (req, res) {
        Note.find({}, function (err, foundNotes) {
            res.send(foundNotes)
        })
    })
    .post(function (req, res) {

        console.log(req.body)
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        })

        note.save()
            .then(r => {
                console.log(r)
            })
            .then(res.send("Successfully added note"))
    })

app.route("/notes/:noteId")
    .delete(function (req, res) {
        Note.deleteOne({_id: req.params.noteId}, function (err) {
            if (!err) {
                console.log("Deleted successfully")
            }
        })
        res.send("Successfully deleted note")
    })

app.listen(3001, function () {
    console.log("Server up and running on port 3001")
})
