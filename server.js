const { notes } = require("./data/db");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const {
	filterByQuery,
	createNewNote,
	validateNote,
	deleteNote,
} = require("./lib/notes");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// api routes

app.get("/api/notes", (req, res) => {
	let results = notes;
	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	//respond with our filtered notes
	res.json(results);
});

app.post("/api/notes", (req, res) => {
	// set id based on what the next index of the array will be
	req.body.id = notes.length.toString();

	//checks if the note is valid and expected before creating
	if (!validateNote(req.body)) {
		res.status(400).send("The note is not properly formatted.");
	} else {
		const note = createNewNote(req.body, notes);

		//respond with our created note
		res.json(note);
	}
});

app.delete("/api/notes/:id", (req, res) => {
	const { id } = req.params;
	const newNotes = deleteNote(id, notes);

	//respond with our notes after deletion of note with matching id
	res.json(newNotes);
});

// html routes
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
