module.exports.userAPI = function(clientRef) {
	this.client = clientRef;
};

module.exports.addUser = async function(req) {
	/*
	 * incoming: recipeName, recipeIngredients[], recipeSteps[]
	 * outgoing: recipeID, error
	 */
	const { name, ingredients, steps } = req.body;
	const created = Date.now();

	const newRecipe = { recipeName: name, recipeIngredients: ingredients, recipeSteps: steps, creationDate: created };

	let error = '';
	let result = '';

	try {
		const db = this.client.db();

		const output = await db.collection('Recipes').insertOne(newRecipe);

		result = output.insertID;
	}
	catch (e) {
		error = e.toString();
	}

	return { recipeID: result, error: error };
};

module.exports.getUser = async function(req) {
	/*
	 * incoming: recipeID
	 * outgoing: recipeName, recipeIngredients[], recipeSteps[], creationDate, error
	 */

	const { id } = req.body;

	const db = this.client.db();
	const results = await db.collection('recipes').find({ id }).toArray();

	let name = '';
	let ingredients = [];
	let steps = [];
	let date = -1;

	if (results.length > 0) {
		name = results[0].UserId;
		ingredients = results[0].recipeIngredients;
		steps = results[0].recipeSteps;
		date = results[0].creationDate;
	}

	return { recipeName: name, recipeIngredients: ingredients, recipeSteps: steps, creationDate: date, error: '' };
};

module.exports.searchByName = async function(req) {
	/*
	 * incoming: search
	 * outgoing: results[], error
	 */

	let error = '';

	const { search } = req.body;

	let _search = search.trim();

	const db = this.client.db();
	const results = await db.collection('recipes').find({ 'Name': { $regex: _search + '.*', $options: 'r' } }).toArray();

	let _ret = [];

	for (let i = 0; i < results.length; i++)
		_ret.push(results[i].Card);

	return { results: _ret, error: error };
};

module.exports.createRecord = async function(req, res, client) {
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

	return { error: error };
};

module.exports.login = async function(req, res, client) {
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

	return { id: id, firstName: fn, lastName: ln, error: '' };
};

module.exports.search = async function(req, res, client) {
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

	return { results: _ret, error: error };
};