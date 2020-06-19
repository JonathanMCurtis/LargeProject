// Use express for our routing
const express = require('express');

// BodyParser functions as middleware to let us extra JSON from a request
const bodyParser = require('body-parser');

// CORS will allow us to deal with cross-origin resource sharing
const cors = require('cors');

// MongoClient will allow us to connect to MongoDB (though we may transition to Mongoose later!)
const MongoClient = require('mongodb').MongoClient;

// Path will resolve static pathing issues from deploying to Heroku
const path = require('path');

// As Heroku deploys to different ports when starting up, this will ensure we listen to the correct port.
const PORT = process.env.PORT || 3000;

// 'dotenv' is a package that can simulate environmental variables during local development
require('dotenv').config();

// Get the URI string for our MongoDB instance, create a new instance and connect to it
const url = process.env.MONGODB_URI;
const client = MongoClient(url);

client.connect();

// Our app will be routed using Express
const app = express();

// Set the 'port' application setting in Express
app.set('port', (process.env.PORT || 3000));

// use(cors()) will remove CORS issues, unless we explicitly place constraints within routes.
app.use(cors());

// This tells Express to use BodyParser as a middleware function, parsing JSON when a request declares JSON content.
app.use(bodyParser.json());

// This tells Express to build the request path based on the path to the static version of the website.
app.use(express.static(path.join(__dirname, 'recipes-web', 'build')));

// app.post() receives a POST request
app.post('/api/addcard', async (req, res) => {
	const { userId, card } = req.body;

	const newCard = { Card: card, UserId: userId };

	let error = '';

	try {
		const db = client.db();

		db.collection('Cards').insertOne(newCard);
	}
	catch (e) {
		error = e.toString();
	}

	let ret = { error: error };

	res.status(200).json(ret);
});

app.post('/api/login', async (req, res) => {
	/*
	 * incoming: login, password
	 * outgoing: id, firstName, lastName, error
	 */

	const { login, password } = req.body;

	const db = client.db();
	const results = await db.collection('cop4331').find({ Login: login, Password: password }).toArray();

	let id = -1;
	let fn = '';
	let ln = '';

	if (results.length > 0) {
		id = results[0].UserId;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	}

	let ret = { id: id, firstName: fn, lastName: ln, error: '' };

	res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res) => {
	/*
	 * incoming: userId, search
	 * outgoing: results[], error
	 */

	let error = '';

	const { search } = req.body;

	let _search = search.trim();

	const db = client.db();
	const results = await db.collection('Cards').find({ 'Card': { $regex: _search + '.*', $options: 'r' } }).toArray();

	let _ret = [];

	for (let i = 0; i < results.length; i++)
		_ret.push(results[i].Card);

	let ret = { results: _ret, error: error };

	res.status(200).json(ret);
});

// If the function was not an API call, attempt to serve the static page located related to our 'build' folder
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'recipes-web', 'build', 'index.html'));
});

// Listen on the designated port, defined earlier
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});