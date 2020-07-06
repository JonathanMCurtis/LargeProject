const ObjectId = require('mongodb').ObjectId;

function UserAPI(clientRef) {
	this.client = clientRef;
};

UserAPI.prototype.CreateUser = async function(req, res) {
	/*
	 * incoming: FirstName, LastName, Login, Password, Email
	 * outgoing: UserID, Error
	 */

	// TODO: Email Verification
	const { FirstName, LastName, Login, Password, Email } = req;

	const newUser = {
		FirstName: FirstName,
		LastName: LastName,
		Login: Login,
		Password: Password,
		Email: Email,
		UserFavorites: [],
		Verified: false
	};

	let Error = '';

	try {
		const db = this.client.db();

		await db.collection('Users').insertOne(newUser);
	}
	catch (e) {
		Error = e.toString();
	}

	let js = {
		UserID: newUser['_id'],
		Error: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.LoginUser = async function(req, res) {
	/*
	 * incoming: Login, Password
	 * outgoing: UserID, Error
	 */

	const { Login, Password } = req;

	let Error = '';
	let _results;

	try {
		const db = this.client.db();

		_results = await db.collection('Users').findOne({ 'Login': Login, Password: Password }).toArray();
	}
	catch (e) {
		Error = e.toString();
	}

	let js = {
		UserID: _results['UserID'],
		Error: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.ValidateUser = async function(req, res) {
	/*
	 * incoming: UserID, ValidationString
	 * outgoing: UserID, Error
	 */

	const { UserID, ValidationString } = req;

	let Error = '';
	let _results = [];

	try {
		const db = this.client.db();

		_results = await db.collection('Users').updateOne(
			{ '_id': ObjectId(UserID), 'ValidationString': ValidationString },
			{ $set: { 'Verified': true } }
		);
	}
	catch (e) {
		Error = e.toString();
	}

	let js = {
		UserID: UserID,
		Error: Error
	};

	if (_results.length > 0)
		js.UserID = _results[0]['_id'];

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = UserAPI;