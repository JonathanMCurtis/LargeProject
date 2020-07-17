const ObjectId = require('mongodb').ObjectId;
const { GetErrorObject, GetRandomString } = require('./API').GetErrorObject;

function UserAPI(clientRef) {
	this.client = clientRef;
}

UserAPI.prototype.CreateUser = async function(req, res, smtp) {
	/*
	 * incoming: firstName, lastName, login, password, email
	 * outgoing: userInfo: {userID, firstName, lastName, email}, error: boolean, result: errorObj
	 */
	const { firstName, lastName, login, password, email } = req;
	const rand = GetRandomString();

	const newUser = {
		firstName: firstName,
		lastName: lastName,
		login: login,
		password: password,
		email: email,
		favoriteNotes: [],
		verified: false,
		verification: rand,
		passwordReset: false
	};

	let result;

	try {
		const db = this.client.db();

		const exists = await db.collection('Users').findOne({ $or: [{ 'login': login }, { 'email': email }] });

		if (exists)
			throw 401;

		await db.collection('Users').insertOne(newUser);
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('unknown', e.toString());
	}

	let js = {
		userID: newUser['_id'],
		error: result['error'],
		result: result['errorObject']
	};

	SendVerification(req, res, smtp, newUser['_id'], newUser['email'], rand);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.ResendVerification = async function (req, res, smtp) {
	/*
	 * incoming: login, email
	 * outgoing: error: boolean, result: errorObj
	 */
	const { login, email } = req;

	let result;

	try {
		const db = this.client.db();

		const user = await db.collection('Users').findOne({ 'login': login, 'email': email, 'verified': false });

		if (!user) {
			throw 'No such user';
		}
		else {
			SendVerification(req, res, smtp, user['_id'], user['email'], user['rand']);
			result = GetErrorObject(200);
		}
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.LoginUser = async function(req, res) {
	/*
	 * incoming: login, password
	 * outgoing: userInfo: {userID, firstName, lastName, email, favorites} or {}, error: boolean, result: errorObj
	 */

	const { login, password } = req;

	let result;
	let _user;

	try {
		const db = this.client.db();

		_user = await db.collection('Users').findOne({ 'login': login, 'password': password, 'verified': true });
		if (_user === null)
			throw 400;
		else
			result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', 'Invalid login.');

		let js = {
			userInfo: {
				userID: 'No user found',
				firstName: 'No user found',
				lastName: 'No user found',
				email: 'No user found'
			},
			error: result.error,
			result: result.errorObject
		};

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	let js = {
		userInfo: {
			userID: result['_id'],
			firstName: result['firstName'],
			lastName: result['lastName'],
			email: result['email'],
			favorites: result['favoriteNotes']
		},
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

function SendVerification(req, res, smtp, id, email, rand) {
	const link = 'https://group21-dev-api.herokuapp.com/api/verify?id=' + id + '&val=' + rand;
	const mailOptions = {
		to: email,
		subject: 'Please confirm your Email account',
		html: 'Hello,<br> Please click on the link to verify your email.<br><a href=' + link + '>Click here to verify</a>'
	};

	console.log(mailOptions);
	smtp.sendMail(mailOptions, function (error, response) {
		if (error)
			console.log(error);
		else
			console.log('Message sent: ' + JSON.stringify(response));
	});
	smtp.close();
}

UserAPI.prototype.VerifyUser = async function(req, res) {
	let result = '';
	let _results = [];
	const id = '' + req.query.id;
	const val = Number(req.query.val);

	console.log(`Attempting to verify user ${id} with value ${val}`);

	try {
		const db = this.client.db();

		_results = await db.collection('Users').updateOne(
			{ _id: ObjectId(id), Verification: val },
			{ $set: { Verified: true } }
		);
		console.log(JSON.stringify(_results));
	}
	catch (e) {
		result = e.toString();
	}

	let js = {
		error: result['error'],
		result: result['errorObject']
	};

	if (_results.length > 0)
		js.UserID = _results[0]['_id'];
	// TODO: Replace with final URL, or environmental variable
	res.redirect('https://studyshare21.herokuapp.com');

/*
 * res.setHeader('Content-Type', 'application/json');
 * res.end(JSON.stringify(js, null, 3));
 */
};

UserAPI.prototype.PasswordRequest = async function(req, res, smtp) {
	/*
	 * incoming: userID
	 * outgoing: error: boolean, result: errorObj
	 */

	const { userID } = req;

	let result;
	let _user;

	try {
		const db = this.client.db();

		_user = await db.collection('Users').findOne({ '_id': userID, 'verified': true });
		if (_user === null)
			throw 400;

		result = GetErrorObject(200);

		const newPass = GetRandomString();
		const newRand = GetRandomString();
		const query = { $set: { 'password': newPass, 'rand': newRand, 'resetPassword': true } };

		db.collection('Users').updateOne({ _id: ObjectId(userID) }, query);

		sendPasswordResetEmail(_user, smtp, newRand);
	}
	catch (e) {
		result = GetErrorObject('default', 'Invalid login.');

		let js = {
			userInfo: {
				userID: 'No user found',
				firstName: 'No user found',
				lastName: 'No user found',
				email: 'No user found'
			},
			error: result.error,
			result: result.errorObject
		};

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	let js = {
		userInfo: {
			userID: result['_id'],
			firstName: result['firstName'],
			lastName: result['lastName'],
			email: result['email']
		},
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

function sendPasswordResetEmail(user, smtp, rand) {
	const { email } = user;

	const mailOptions = {
		to: email,
		subject: 'Password Reset Request',
		html: 'Hello,<br> Please use the following code to confirm your email address.<br>Your code is: <b>' + rand + '<\b>'
	};

	console.log(mailOptions);
	smtp.sendMail(mailOptions, function (error, response) {
		if (error)
			console.log(error);
		else
			console.log('Message sent: ' + JSON.stringify(response));
	});
	smtp.close();
}

UserAPI.prototype.UpdatePassword = async function(req, res) {
	/*
	 * incoming: userID, password, rand
	 * outgoing: userID: string, error: boolean, result: errorObj
	 */

	const { userID, password, rand } = req;

	const query = { $set: { 'password': password, resetPassword: false } };
	let result = '';

	try {
		const db = this.client.db();

		const result = await db.collection('Users').findOne({ _id: ObjectId(userID), verification: rand, resetPassword: true });

		if (!result)
			throw 'No such user';
		await db.collection('Users').updateOne({ _id: ObjectId(userID) }, query);
		GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		userID: userID,
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.ChangePassword = async function(req, res) {
	/*
	 * incoming: userID, password, newPassword
	 * outgoing: userID: string, error: boolean, result: errorObj
	 */

	const { userID, password, newPassword } = req;

	const query = { $set: { 'password': newPassword } };
	let result = '';

	try {
		const db = this.client.db();

		const result = await db.collection('Users').findOne({ _id: ObjectId(userID), password: password });

		if (!result)
			throw 'No such user';
		await db.collection('Users').updateOne({ _id: ObjectId(userID), password: password }, query);
		GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		userID: userID,
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.SetFavorite = async function(req, res, isAddingFavorite) {
	/*
	 * incoming: userID, noteID
	 * outgoing: favorites: string[], error: boolean, result: errorObj
	 */

	const { userID, noteID } = req;
	let result = '';
	let favorites;

	try {
		const db = this.client.db();

		const user = await db.collection('Users').findOne({ _id: ObjectId(userID) });
		const note = await db.collection('Notes').findOne({ _id: ObjectId(noteID) });

		if (!user)
			throw 'No such user';
		if (!note)
			throw 'No such note';

		favorites = user['favoriteNotes'];

		if (isAddingFavorite === favorites.includes(noteID))
			throw 'Invalid noteID';
		if (isAddingFavorite) {
			favorites.push(noteID);
			const userQuery = { $set: { 'favoriteNotes': favorites } };
			const noteQuery = { $set: { 'favoriteCount': note['favoriteCount'] + 1 } };

			db.collection('Users').updateOne({ _id: ObjectId(userID) }, userQuery);
			db.collection('Notes').updateOne({ _id: ObjectId(noteID) }, noteQuery);
		}
		else {
			favorites = favorites.splice(favorites.indexOf(noteID), 1);
			const userQuery = { $set: { 'favoriteNotes': favorites } };
			const noteQuery = { $set: { 'favoriteCount': note['favoriteCount'] - 1 } };

			db.collection('Users').updateOne({ _id: ObjectId(userID) }, userQuery);
			db.collection('Notes').updateOne({ _id: ObjectId(noteID) }, noteQuery);
		}
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());
	}

	let js = {
		favorites: favorites,
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = UserAPI;