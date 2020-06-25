const ObjectId = require('mongodb').ObjectId;

function RecipeAPI(clientRef) {
	this.client = clientRef;
}

RecipeAPI.prototype.addRecipe = async function(req, res) {
	/*
	 * incoming: recipeName, recipeIngredients[], recipeSteps[]
	 * outgoing: recipeID, error
	 */

	const { recipeName, recipeIngredients, recipeSteps } = req;

	const created = Date.now();

	const newRecipe = { recipeName: recipeName, recipeIngredients: recipeIngredients, recipeSteps: recipeSteps, creationDate: created };

	let error = '';

	try {
		const db = this.client.db();

		await db.collection('Recipes').insertOne(newRecipe);
	}
	catch (e) {
		error = e.toString();
	}

	let js = {
		recipeID: newRecipe['_id'],
		error: error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.getRecipe = async function(req, res) {
	/*
	 * incoming: recipeID
	 * outgoing: recipeName, recipeIngredients[], recipeSteps[], creationDate, error
	 */

	const { recipeID } = req;

	const db = this.client.db();
	const results = await db.collection('Recipes').findOne({ '_id': ObjectId(recipeID) });

	let js = {
		recipeName: results['recipeName'],
		recipeIngredients: results['recipeIngredients'],
		recipeSteps: results['recipeSteps'],
		creationDate: results['creationDate'],
		error: ''
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.deleteRecipe = async function(req, res) {
	/*
	 * incoming: recipeID
	 * outgoing: error
	 */

	const { recipeID } = req;

	let error = '';

	try	{
		const db = this.client.db();

		await db.collection('Recipes').deleteOne({ '_id': ObjectId(recipeID) });
	}
	catch (e) {
		error = e.toString();
	}
	let js = {
		error: error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

RecipeAPI.prototype.searchByName = async function(req, res) {
	/*
	 * incoming: search
	 * outgoing: results[], error
	 */

	let error = '';

	const { search } = req;

	let _search = search.trim();

	const db = this.client.db();
	const results = await db.collection('Recipes').find({ 'recipeName': { $regex: _search + '.*', $options: 'r' } }).toArray();

	let _ret = [];

	for (let i = 0; i < results.length; i++)
		_ret.push(results[i].recipeName);

	let js = {
		results: _ret,
		error: error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = RecipeAPI;