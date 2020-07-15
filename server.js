// Use express for our routing
const express = require('express');

// 'dotenv' is a package that can simulate environmental variables during local development
require('dotenv').config();

const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		user: process.env.MAIL_USER,
		clientId: process.env.MAIL_ID,
		clientSecret: process.env.MAIL_SECRET,
		refreshToken: process.env.MAIL_REFRESH,
		accessToken: process.env.MAIL_ACCESS
	}
});

// Import our recipe and user API modules
const notes = require('./api/NotesAPI');
const users = require('./api/UserAPI');

// BodyParser functions as middleware to let us extract JSON from a request
const bodyParser = require('body-parser');

// CORS will allow us to deal with cross-origin resource sharing
const cors = require('cors');

// MongoClient will allow us to connect to MongoDB (though we may transition to Mongoose later!)
const MongoClient = require('mongodb').MongoClient;

// Path will resolve static pathing issues from deploying to Heroku
const path = require('path');

// As Heroku deploys to different ports when starting up, this will ensure we listen to the correct port.
const PORT = process.env.PORT || 3001;

// Get the URI string for our MongoDB instance, create a new instance and connect to it
const url = process.env.MONGODB_URI;
const client = MongoClient(url);

client.connect();

// Our app will be routed using Express
const app = express();

const notesAPI = new notes(client);
const userAPI = new users(client);

// Set the 'port' application setting in Express
app.set('port', PORT);

// use(cors()) will remove CORS issues, unless we explicitly place constraints within routes.
app.use(cors());

// This tells Express to use BodyParser as a middleware function, parsing JSON when a request declares JSON content.
app.use(bodyParser.json());

// This tells Express to build the request path based on the path to the static version of the website.
app.use(express.static(path.join(__dirname, 'recipes_web', 'build')));

// app.post() receives a POST request
app.post('/api/CreateUser', async (req, res) => userAPI.CreateUser(req.body, res, smtpTransport));
app.post('/api/LoginUser', async (req, res) => userAPI.LoginUser(req.body, res));
app.post('/api/ResendVerification', async (req, res) => userAPI.ResendVerification(req.body, res, smtpTransport));
app.get('/api/verify', async (req, res) => userAPI.VerifyUser(req.body, res));
app.post('/api/ResetPassword', async (req, res) => userAPI.ResetPassword(req.body, res, smtpTransport));
app.post('/api/AddFavorite', async (req, res) => userAPI.SetFavorite(req.body, res, true));
app.post('/api/RemoveFavorite', async (req, res) => userAPI.SetFavorite(req.body, res, false));
app.post('/api/CreateNote', async (req, res) => notesAPI.CreateNote(req.body, res));
app.post('/api/GetNote', async (req, res) => notesAPI.GetNote(req.body, res));
app.post('/api/GetSubmittedNotes', async (req, res) => notesAPI.GetSubmittedNotes(req.body, res));
app.post('/api/GetFavoriteNotes', async (req, res) => notesAPI.GetFavoritedNotes(req.body, res));
app.post('/api/GetNotes', async (req, res) => notesAPI.GetNotes(req.body, res));
app.post('/api/SearchByContent', async (req, res) => notesAPI.SearchByField(req.body, res, 'content'));
app.post('/api/SearchBySubject', async (req, res) => notesAPI.SearchByField(req.body, res, 'subject'));
app.post('/api/SearchByTopic', async (req, res) => notesAPI.SearchByField(req.body, res, 'topic'));
app.post('/api/UpdateNote', async (req, res) => notesAPI.UpdateNote(req.body, res));
app.post('/api/DeleteNote', async (req, res) => notesAPI.DeleteNote(req.body, res));

// If the function was not an API call, attempt to serve the static page located related to our 'build' folder
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'recipes_web', 'build', 'index.html'));
});

// Listen on the designated port, defined earlier
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});