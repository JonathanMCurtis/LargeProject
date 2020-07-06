// Use express for our routing
const express = require('express');

// Import our recipe and user API modules
const recipes = require('./api/RecipeAPI');
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

// 'dotenv' is a package that can simulate environmental variables during local development
require('dotenv').config();

// Get the URI string for our MongoDB instance, create a new instance and connect to it
const url = process.env.MONGODB_URI;
const client = MongoClient(url);

client.connect();

// Our app will be routed using Express
const app = express();

const recipeAPI = new recipes();
const userAPI = new users();

// Set the 'port' application setting in Express
app.set('port', PORT);

// use(cors()) will remove CORS issues, unless we explicitly place constraints within routes.
app.use(cors());

// This tells Express to use BodyParser as a middleware function, parsing JSON when a request declares JSON content.
app.use(bodyParser.json());

// This tells Express to build the request path based on the path to the static version of the website.
app.use(express.static(path.join(__dirname, 'recipes_web', 'build')));

// app.post() receives a POST request
app.post('/api/user/CreateUser', async (req, res) => userAPI.CreateUser(req.body, res));
app.post('/api/user/LoginUser', async (req, res) => userAPI.LoginUser(req.body, res));
app.post('/api/user/ValidateUser', async (req, res) => userAPI.ValidateUser(req.body, res));
app.post('/api/recipe/CreateRecipe', async (req, res) => recipeAPI.CreateRecipe(req.body, res));
app.post('/api/recipe/GetRecipe', async (req, res) => recipeAPI.GetRecipe(req.body, res));
app.post('/api/recipe/GetRecipes', async (req, res) => {
	/*
	 * incoming: PageNumber
	 * outgoing: Recipes [_id, RecipeName, Ingredients, Instructions, Description, Type, Cost], Error
	 */

	const { PageNumber } = req;
	let results;
	let Error = '';
	const size = 15;
	const start = size * PageNumber;

	try {
		const db = client.db();

		results = await db.collection('Recipes').find({}, GetRecipeListProjection()).skip(start).limit(size).toArray();
	}
	catch (e) {
		console.log('Error in API call');
		Error = 'Dev error: ' + e.toString();
	}

	console.log(results);

	let js = {
		Recipes: results,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
});
app.post('/api/recipe/SearchByName', async (req, res) => recipeAPI.SearchByField(req.body, res, 'RecipeName'));
app.post('/api/recipe/SearchByType', async (req, res) => recipeAPI.SearchByField(req.body, res, 'Type'));
app.post('/api/recipe/DeleteRecipe', async (req, res) => recipeAPI.DeleteRecipe(req.body, res));

// If the function was not an API call, attempt to serve the static page located related to our 'build' folder
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'recipes_web', 'build', 'index.html'));
});

// Listen on the designated port, defined earlier
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});

function GetRecipeListProjection() {
	return {
		_id: 1,
		RecipeName: 1,
		Ingredients: 0,
		Instructions: 0,
		Description: 0,
		Type: 0,
		Cost: 1,
		SubmissionDate: 1,
		FavoriteCount: 1,
		AverageRating: 1
	};
}