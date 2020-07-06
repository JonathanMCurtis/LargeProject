const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

function RecipeAPI(clientRef) {
	this.client = clientRef
}

RecipeAPI.prototype.CreateRecipe = async function(req, res) {
	/*
	 * incoming: RecipeName, Ingredients[], Instructions[], Description, Type, Cost, UserID
	 * outgoing: RecipeID, Result
	 */

	const { RecipeName, Ingredients, Instructions, Description, Type, Cost, UserID } = req;
	const submissionDate = Date.now();
	let Error = '';

	const newRecipe = {
		RecipeName: RecipeName,
		Ingredients: Ingredients,
		Instructions: Instructions,
		Description: Description,
		Type: Type,
		Cost: Cost,
		SubmissionDate: submissionDate,
		FavoriteCount: 0,
		RatingCount: 0,
		AverageRating: 0,
		UserID: UserID
	};

	try {
		const db = this.client.db();

		await db.collection('Recipes').insertOne(newRecipe);
		await db.collection('Recipes').updateOne(
			{ '_id': ObjectId(newRecipe['_id']) },
			{ $set: { 'RecipeID': newRecipe['_id'] } }
		);
	}

	catch (e) {
		Error = e.toString();
	}

	let js = {
		RecipeID: newRecipe['_id'],
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.GetRecipe = async function(req, res) {
	/*
	 * incoming: RecipeID
	 * outgoing: RecipeName, Ingredients, Instructions, Description, Type, Cost, SubmissionDate, FavoriteCount, AverageRating, Error
	 */

	const { RecipeID } = req;
	let result;
	let Error = '';

	try {
		const db = this.client.db();

		result = await db.collection('Recipes').findOne({ '_id': ObjectId(RecipeID) });
	}
	catch (e) {
		Error = e.toString();
	}

	let js = {
		RecipeName: result['RecipeName'],
		Ingredients: result['Ingredients'],
		Instructions: result['Instructions'],
		Description: result['Description'],
		Type: result['Type'],
		Cost: result['Cost'],
		SubmissionDate: result['SubmissionDate'],
		FavoriteCount: result['FavoriteCount'],
		AverageRating: result['AverageRating'],
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

function BuildRecipeList(results) {
	let _ret = [];

	for (let recipe in results) {
		let out = {
			RecipeName: recipe['RecipeName'],
			AverageRating: recipe['AverageRating'],
			Cost: recipe['Cost'],
			SubmissionDate: recipe['SubmissionDate']
		};

		_ret.push(out);
	}

	return _ret;
}

function GetRecipeListProjection() {
	return {
		_id: 1,
		RecipeName: 1,
		Cost: 1,
		SubmissionDate: 1,
		FavoriteCount: 1,
		AverageRating: 1
	};
}

RecipeAPI.prototype.GetRecipes = async function(req, res) {
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
		const db = this.client.db();

		results = await db.collection('Recipes').find({}, {
			_id: 1,
			RecipeName: 1,
			Cost: 1,
			SubmissionDate: 1,
			FavoriteCount: 1,
			AverageRating: 1
		}).skip(start).limit(size).toArray();
	}
	catch (e) {
		Error = 'Dev error: ' + e.toString();
	}

	let js = {
		Recipes: results,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.GetSubmittedRecipes = async function(req, res) {
	/*
	 * incoming: UserID
	 * outgoing: Recipes [RecipeName, Ingredients, Instructions, Description, Type, Cost], Result
	 */

	const { UserID } = req;
	let results;
	let Error = '';

	try {
		const db = this.client.db();

		results = await db.collection('Recipes').find({ 'UserID': ObjectId(UserID) });
	}
	catch (e) {
		Error = e.toString();
	}

	const _ret = BuildRecipeList(results);

	let js = {
		Recipes: _ret,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.GetFavoriteRecipes = async function(req, res) {
	/*
	 * incoming: UserID
	 * outgoing: Results [RecipeName, Ingredients, Instructions, Description, Type, Cost], Error
	 */

	const { UserID } = req;
	let favorites = [];
	let results;
	let Error = '';

	try {
		const db = this.client.db();

		favorites = await db.collection('Users').findOne({ '_id': ObjectId(UserID) });
		results = await db.collection('Recipes').find({ '_id': { $in: favorites } });
	}
	catch (e) {
		Error = e.toString();
	}

	const _ret = BuildRecipeList(results);

	let js = {
		Results: _ret,
		Error: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.SearchByField = async function(req, res, _field) {
	/*
	 * incoming: Search
	 * outgoing: Results[], Error
	 */

	let Error = '';

	const { Search } = req;
	let results;

	let _search = Search.trim() + '.*';

	try {
		const db = this.client.db();
		let query = {};

		query[_field] = { $regex: _search, $options: 'r' };
		results = await db.collection('Recipes').find(query).toArray();
	}
	catch (e) {
		Error = e.toString();
	}

	const _ret = BuildRecipeList(results);

	let js = {
		results: _ret,
		error: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.RateRecipe = async function(req, res) {
	/*
	 * incoming: RecipeID, Rating
	 * outgoing: AverageRating, Result
	 */

	const { RecipeID, Rating } = req;
	let result;
	let newRating;
	let Error = '';

	try {
		const db = this.client.db();

		const recipe = await db.collection('Recipes').findOne({ '_id': ObjectId(RecipeID) });
		const currentAverage = recipe['AverageRating'];
		const ratingCount = recipe['RatingCount'];

		newRating = (currentAverage + Rating) / (ratingCount + 1);

		result = await db.collection('Recipes').updateOne(
			{ '_id': ObjectId(RecipeID) },
			{ $set: { 'AverageRating': newRating, 'RatingCount': ratingCount + 1 } }
		);
	}
	catch (e) {
		Error = e.toString();
	}

	if (result['modifiedCount'] === 0) {
		// TODO: Result in error for lack of modifications.
	}

	let js = {
		AverageRating: newRating,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.DeleteRecipe = async function(req, res) {
	/*
	 * incoming: RecipeID
	 * outgoing: Error
	 */

	const { RecipeID } = req;

	let Error = '';

	try	{
		const db = this.client.db();

		await db.collection('Recipes').deleteOne({ '_id': ObjectId(RecipeID) });
	}
	catch (e) {
		Error = e.toString();
	}
	let js = {
		Error: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = RecipeAPI;