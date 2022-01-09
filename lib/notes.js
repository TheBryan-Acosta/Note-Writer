const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepers) {
	let filteredResults = zookeepers;

	if (query.title) {
		filteredResults = filteredResults.filter(
			(notes) => notes.title === query.title
		);
	}

	return filteredResults;
}

module.exports = { filterByQuery };
