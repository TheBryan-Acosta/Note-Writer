const { notes } = require("./data/db");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const { filterByQuery } = require("./lib/notes");

console.log(notes);
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
	res.json(results);
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
