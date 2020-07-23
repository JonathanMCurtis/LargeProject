const ObjectId = require('mongodb').ObjectId;
const NoteFields = ['title', 'subject', 'topic', 'content', 'url', 'favoriteCount'];
const { GetErrorObject, GetNotesProjection, size } = require('./API');

function NotesAPI(clientRef) {
	this.client = clientRef;
	this.start = (pageNumber) => { return (size * pageNumber) };
}

NotesAPI.prototype.CreateNote = async function(req, res) {
	/*
	 * incoming: title, subject, topic, content, url, userID, login
	 * outgoing: noteID: string, error: boolean, result: errorObj
	 */

	const { title, subject, topic, content, url, userID, login } = req;
	const submissionDate = Date.now();
	let result;

	const newNote = {
		title: title,
		subject: subject,
		topic: topic,
		content: content,
		url: url,
		favoriteCount: 0,
		submissionDate: submissionDate,
		lastUpdate: submissionDate,
		userID: userID,
		login: login
	};

	try {
		const db = this.client.db();

		await db.collection('Notes').insertOne(newNote);
		result = GetErrorObject(200);
	}

	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		noteID: newNote['_id'],
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

NotesAPI.prototype.GetNote = async function(req, res) {
	/*
	 * incoming: noteID
	 * outgoing: note: {title, subject, topic, content, url, favoriteCount, submissionDate, userID},
	 * 			  error: boolean, result: errorObj
	 */

	const { noteID } = req;
	let note;
	let result;

	try	{
		const db = this.client.db();

		note = await db.collection('Notes').findOne({ _id: ObjectId(noteID) });
		result = GetErrorObject(200);
	}
	catch (e)	{
		result = GetErrorObject('default', e.toString());
	}
	let js;

	if (!note)	{
		result = GetErrorObject('default', 'No note found');
		js = {
			note: {},
			error: result['error'],
			result: result['errorObject']
		};
	}
	else {
		js = {
			'note': {
				title: note['title'],
				subject: note['subject'],
				content: note['content'],
				url: note['url'],
				favoriteCount: note['favoriteCount'],
				submissionDate: note['submissionDate'],
				lastUpdate: note['lastUpdated'],
				userID: note['submissionDate'],
				login: note['login']
			},
			error: result['error'],
			result: result['errorObject']
		};
	}

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

NotesAPI.prototype.GetNotes = async function(req, res) {
	/*
	 * incoming: subject, topic
	 * outgoing: notes [{_id, title, subject, topic, submissionDate, favoriteCount}], error: boolean, result: errorObj
	 */

	const { subject } = req;
	const topic = req.topic;
	let notes;
	let result;

	try {
		const db = this.client.db();
		let query = { subject: subject };

		if (topic)
			query.topic = topic;

		notes = await db.collection('Notes').find(query).project(GetNotesProjection()).toArray();
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		notes: notes,
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

NotesAPI.prototype.GetSubmittedNotes = async function(req, res) {
	/*
	 * incoming: userID
	 * outgoing: notes [{_id, title, subject, topic, submissionDate, favoriteCount}], error: boolean, result: errorObj
	 */

	const { noteID } = req;
	let notes;
	let result;

	try {
		const db = this.client.db();

		notes = await db.collection('Notes').find({ userID: noteID }).project(GetNotesProjection()).toArray();
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		notes: notes,
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

NotesAPI.prototype.GetFavoriteNotes = async function(req, res) {
	/*
	 * incoming: userID
	 * outgoing: notes [{_id, title, subject, topic, submissionDate, favoriteCount}], error: boolean, result: errorObj
	 */

	const { userID } = req;
	let favorites = [];
	let notes;
	let result;

	try {
		const db = this.client.db();
		const userData = await db.collection('Users').findOne({ '_id': ObjectId(userID) });

		favorites = userData['favoriteNotes'];
		notes = await db.collection('Notes').find({ '_id': { $in: favorites } }).project(GetNotesProjection()).toArray();
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		notes: notes,
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

NotesAPI.prototype.SearchByField = async function(req, res, _field) {
	/*
	 * incoming: search
	 * outgoing: notes[{_id, title, subject, topic, submissionDate, favoriteCount}], error: boolean, result: errorObj
	 */

	let result;

	const { search } = req;
	let notes;

	let _search = search.trim() + '.*';

	try {
		const db = this.client.db();
		let query = {};

		query[_field] = { $regex: _search, $options: 'r' };
		notes = await db.collection('Notes').find(query).project(GetNotesProjection()).toArray();
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		notes: notes,
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

NotesAPI.prototype.UpdateNote = async function(req, res) {
	/*
	 * incoming: noteID, title, subject, topic, content, url, favoriteCount
	 * outgoing: noteID: string, error: boolean, result: errorObj
	 */

	const noteID = req.noteID;
	let updateObject = {};

	for (let key in req) {
		if (NoteFields.includes(key))
			updateObject[key] = req[key];
	}

	updateObject['lastUpdate'] = Date.now();

	const query = { $set: updateObject };
	let result = '';

	try {
		const db = this.client.db();

		await db.collection('Notes').updateOne({ _id: ObjectId(noteID) }, query);
		GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		noteID: noteID,
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	console.log('Result: ' + JSON.stringify(js));

	return js;
};

NotesAPI.prototype.DeleteNote = async function(req, res) {
	/*
	 * incoming: noteID
	 * outgoing: error: boolean, result: errorObject
	 */

	const { noteID } = req;

	let result;

	try	{
		const db = this.client.db();

		await db.collection('Notes').deleteOne({ '_id': ObjectId(noteID) });
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}
	let js = {
		error: result['error'],
		result: result['errorObject']
	};

	if (res !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	return js;
};

module.exports = NotesAPI;