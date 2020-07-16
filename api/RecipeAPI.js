const ObjectId = require('mongodb').ObjectId;
const size = 15;
const RecipeFields = ['RecipeName', 'Ingredients', 'Instructions', 'Description', 'Type', 'Cost'];

function RecipeAPI(clientRef) {
	this.client = clientRef;
	this.start = (pageNumber) => { return (size * pageNumber) };
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
		UserID: UserID
	};

	try {
		const db = this.client.db();

		await db.collection('Recipes').insertOne(newRecipe);
	}

	catch (e) {
		Error = 'Dev error: ' + e.toString();
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
	 * outgoing: Recipe: {RecipeName, Ingredients, Instructions, Description, Type, Cost, SubmissionDate, FavoriteCount}, Error
	 */

	const { RecipeID } = req;
	let result;
	let Error = '';

	try	{
		const db = this.client.db();

		result = await db.collection('Recipes').findOne({ '_id': ObjectId(RecipeID) });
	}
	catch (e)	{
		Error = e.toString();
	}
	let js;

	if (result == null)	{
		js = {
			Recipe: {},
			Result: 'No Recipe Found'
		};
	}
	else {
		js = {
			'Recipe': {
				RecipeName: result['RecipeName'],
				Ingredients: result['Ingredients'],
				Instructions: result['Instructions'],
				Description: result['Description'],
				Type: result['Type'],
				Cost: result['Cost'],
				SubmissionDate: result['SubmissionDate'],
				FavoriteCount: result['FavoriteCount']
			},
			Result: Error
		};
	}

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
	 * outgoing: Recipes [{_id, RecipeName, Ingredients, Instructions, Description, Type, Cost}], Result
	 */

	const { PageNumber } = req;
	let results;
	let Error = '';

	try {
		const db = this.client.db();

		results = await db.collection('Recipes').find({}).skip(this.start(PageNumber)).limit(size).project(GetRecipeListProjection()).toArray();
	}
	catch (e) {
		Error = e.toString();
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
	 * incoming: UserID, PageNumber
	 * outgoing: Recipes [{_id, RecipeName, Ingredients, Instructions, Description, Type, Cost}], Result
	 */

	const { UserID, PageNumber } = req;
	let results;
	let Error = '';

	try {
		const db = this.client.db();

		results = await db.collection('Recipes').find({ UserID: UserID }).skip(this.start(PageNumber)).limit(size).project(GetRecipeListProjection()).toArray();
	}
	catch (e) {
		Error = e.toString();
	}

	let js = {
		Recipes: results,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.GetFavoriteRecipes = async function(req, res) {
	/*
	 * incoming: UserID
	 * outgoing: Recipes [{RecipeName, Ingredients, Instructions, Description, Type, Cost}], Result
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

	let js = {
		Recipes: results,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.SearchByField = async function(req, res, _field) {
	/*
	 * incoming: Search, PageNumber
	 * outgoing: Recipes[], Result
	 */

	let Error = '';

	const { Search, PageNumber } = req;
	let results;

	let _search = Search.trim() + '.*';

	try {
		const db = this.client.db();
		let query = {};

		query[_field] = { $regex: _search, $options: 'r' };
		results = await db.collection('Recipes').find(query).skip(this.start(PageNumber)).limit(size).project(GetRecipeListProjection()).toArray();
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

RecipeAPI.prototype.UpdateRecipe = async function(req, res) {
	/*
	 * incoming: RecipeID, RecipeName, Ingredients[], Instructions[], Description, Type, Cost
	 * outgoing: RecipeID, Result
	 */

	const RecipeID = req.RecipeID;
	let updateObject = {};

	for (let key in req) {
		if (RecipeFields.includes(key))
			updateObject[key] = req[key];
	}

	updateObject['SubmissionDate'] = Date.now();

	const query = { $set: updateObject };
	let Error = '';

	try {
		const db = this.client.db();

		await db.collection('Recipes').updateOne({ _id: ObjectId(RecipeID) }, query);
	}

	catch (e) {
		Error = 'Dev error: ' + e.toString();
	}

	let js = {
		RecipeID: RecipeID,
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.DeleteRecipe = async function(req, res) {
	/*
	 * incoming: RecipeID
	 * outgoing: Result
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
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = RecipeAPI;