const fs = require("fs");
const path = require("path");

//allows us to filter by query
const filterByQuery = (query, notes) => {
	let filteredResults = notes;

	if (query.id) {
		filteredResults = filteredResults.filter((notes) => notes.id === query.id);
	}
	if (query.title) {
		filteredResults = filteredResults.filter(
			(notes) => notes.title === query.title
		);
	}

	return filteredResults;
};

//validate note for our post method
const validateNote = (note) => {
	//check if note keys are string and not falsey
	if (!note.id || typeof note.id !== "string") {
		return false;
	}
	if (!note.title || typeof note.title !== "string") {
		return false;
	}
	if (!note.text || typeof note.text !== "string") {
		return false;
	}
	return true;
};

//create a note
const createNewNote = (body, notes) => {
	//take in body obj and push it into our notes
	notes.push(body);

	//rewrite notes in our database to our updated notes
	fs.writeFileSync(
		path.join(__dirname, "../data/db.json"),
		JSON.stringify({ notes }, null, 2)
	);
	//return what was entered as body(our note)
	return body;
};

//delete a note
const deleteNote = (id, notes) => {
	//get the index of the matching id value in notes
	var index = notes
		.map((note) => {
			return note.id;
		})
		.indexOf(id);

	//remove the index in array
	notes.splice(index, 1);

	//rewrite notes in database to be our new notes array
	fs.writeFileSync(
		path.join(__dirname, "../data/db.json"),
		JSON.stringify({ notes }, null, 2)
	);
	//return our new notes array
	return notes;
};

module.exports = { filterByQuery, validateNote, createNewNote, deleteNote };
