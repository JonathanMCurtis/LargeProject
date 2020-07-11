const ObjectId = require('mongodb').ObjectId;
const size = 15;
const NoteFields = ['title', 'subject', 'content', 'url', 'favoriteCount'];

function NotesAPI(clientRef) {
	this.client = clientRef;
	this.start = (pageNumber) => { return (size * pageNumber) };
}

NotesAPI.prototype.CreateNote = async function(req, res) {
	/*
	 * incoming: title, subject, content, url, userID
	 * outgoing: noteID, Result
	 */

	const { title, subject, content, url, userID } = req;
	const submissionDate = Date.now();
	let result = '';

	const newNote = {
		title: title,
		subject: subject,
		content: content,
		url: url,
		favoriteCount: 0,
		submissionDate: submissionDate,
		userID: userID
	};

	try {
		const db = this.client.db();

		await db.collection('Notes').insertOne(newNote);
	}

	catch (e) {
		result = e.toString();
	}

	let js = {
		noteID: newNote['_id'],
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

NotesAPI.prototype.GetNote = async function(req, res) {
	/*
	 * incoming: noteID, userID
	 * outgoing: note: {title, subject, content, url, favoriteCount, submissionDate, userID, hasUserFavorited}, result
	 */

	const { noteID, userID } = req;
	let note;
	let userData;
	let userFavorited;
	let result = '';

	try	{
		const db = this.client.db();

		note = await db.collection('Notes').findOne({ '_id': ObjectId(noteID) });
		userData = await db.collection('Users').findOne({ '_id': ObjectId(userID) });
		userFavorited = userData['favoritedNotes'].includes(note['_id']);
	}
	catch (e)	{
		result = e.toString();
	}
	let js;

	if (note == null)	{
		js = {
			note: {},
			result: 'No note found'
		};
	}
	else if (userData == null) {
		js = {
			note: {},
			result: 'No such user'
		};
	}
	else {
		js = {
			'note': {
				title: note['title'],
				subject: note['subject'],
				content: note['content'],
				url: note['Description'],
				favoriteCount: note['Type'],
				submissionDate: note['Cost'],
				userID: note['SubmissionDate'],
				hasUserFavorited: userFavorited
			},
			result: result
		};
	}

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

// TODO: Add isFavorited after retrieving notes.
function GetNotesProjection() {
	return {
		_id: 1,
		title: 1,
		subject: 1,
		submissionDate: 1,
		favoriteCount: 1
	};
}

NotesAPI.prototype.GetNotes = async function(req, res) {
	/*
	 * incoming: pageNumber
	 * outgoing: notes [{_id, title, subject, submissionDate, favoriteCount}], result
	 */

	const { pageNumber } = req;
	let notes;
	let result = '';

	try {
		const db = this.client.db();

		notes = await db.collection('Notes').find({}).skip(this.start(pageNumber)).limit(size).project(GetNotesProjection()).toArray();
	}
	catch (e) {
		result = e.toString();
	}

	let js = {
		notes: notes,
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

NotesAPI.prototype.GetSubmittedNotes = async function(req, res) {
	/*
	 * incoming: userID, pageNumber
	 * outgoing: notes [{_id, title, subject, submissionDate, favoriteCount}], result
	 */

	const { noteID, pageNumber } = req;
	let notes;
	let result = '';

	try {
		const db = this.client.db();

		notes = await db.collection('Notes').find({ userID: noteID }).skip(this.start(pageNumber)).limit(size).project(GetNotesProjection()).toArray();
	}
	catch (e) {
		result = e.toString();
	}

	let js = {
		notes: notes,
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

// TODO: Add pagination for favorited notes.
NotesAPI.prototype.GetFavoritedNotes = async function(req, res) {
	/*
	 * incoming: userID, pageNumber
	 * outgoing: notes [{_id, title, subject, submissionDate, favoriteCount}], result
	 */

	const { userID } = req;
	let favorites = [];
	let notes;
	let result = '';

	try {
		const db = this.client.db();

		const userData = await db.collection('Users').findOne({ '_id': ObjectId(userID) });

		favorites = userData['favoritedNotes'];
		notes = await db.collection('Notes').find({ '_id': { $in: favorites } }).limit(size).project(GetNotesProjection()).toArray();
	}
	catch (e) {
		result = e.toString();
	}

	let js = {
		notes: notes,
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

NotesAPI.prototype.SearchByField = async function(req, res, _field) {
	/*
	 * incoming: search, pageNumber
	 * outgoing: notes[{_id, title, subject, submissionDate, favoriteCount}], result
	 */

	let result = '';

	const { search, pageNumber } = req;
	let notes;

	let _search = search.trim() + '.*';

	try {
		const db = this.client.db();
		let query = {};

		query[_field] = { $regex: _search, $options: 'r' };
		notes = await db.collection('Notes').find(query).skip(this.start(pageNumber)).limit(size).project(GetNotesProjection()).toArray();
	}
	catch (e) {
		result = e.toString();
	}

	let js = {
		notes: notes,
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

NotesAPI.prototype.UpdateNote = async function(req, res) {
	/*
	 * incoming: noteID, title, subject, content, url, favoriteCount
	 * outgoing: noteID, result
	 */

	const noteID = req.noteID;
	let updateObject = {};

	for (let key in req) {
		if (NoteFields.includes(key))
			updateObject[key] = req[key];
	}

	updateObject['SubmissionDate'] = Date.now();

	const query = { $set: updateObject };
	let result = '';

	try {
		const db = this.client.db();

		await db.collection('Notes').updateOne({ _id: ObjectId(noteID) }, query);
	}

	catch (e) {
		result = e.toString();
	}

	let js = {
		noteID: noteID,
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

NotesAPI.prototype.DeleteNote = async function(req, res) {
	/*
	 * incoming: noteID
	 * outgoing: result
	 */

	const { noteID } = req;

	let result = '';

	try	{
		const db = this.client.db();

		await db.collection('Notes').deleteOne({ '_id': ObjectId(noteID) });
	}
	catch (e) {
		result = e.toString();
	}
	let js = {
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = NotesAPI;