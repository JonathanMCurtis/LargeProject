const ObjectId = require('mongodb').ObjectId;
const { GetErrorObject, GetRandomString } = require('./API');

function UserAPI(clientRef) {
	this.client = clientRef;
}

UserAPI.prototype.CreateUser = async function(req, res, smtp) {
	/*
	 * incoming: firstName, lastName, login, password, email
	 * outgoing: userInfo: {userID, firstName, lastName, email, favorites, verified}, error: boolean, result: errorObj
	 */
	const { firstName, lastName, login, password, email } = req;
	const rand = GetRandomString(6);

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

		const exists = await db.collection('Users').findOne({ 'login': login });

		if (exists)
			throw 401;

		await db.collection('Users').insertOne(newUser);
		result = GetErrorObject(200);
	}
	catch (e) {
		result = GetErrorObject('unknown', e.toString());
	}

	let js = {
		userInfo: {
			'userID': newUser['_id'],
			'firstName': firstName,
			'lastName': lastName,
			'email': email,
			'favorites': [],
			'verified': false
		},
		error: result['error'],
		result: result['errorObject']
	};

	if (!result['error'])
		SendVerification(req, res, smtp, newUser['email'], rand);

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
			SendVerification(req, res, smtp, user['email'], user['rand']);
			result = GetErrorObject(200);
		}
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());

		let js = {
			error: result['error'],
			result: result['errorObject']
		};

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}
};

UserAPI.prototype.LoginUser = async function(req, res) {
	/*
	 * incoming: login, password
	 * outgoing: userInfo: {userID, firstName, lastName, email, favorites, verified} or {}, error: boolean, result: errorObj
	 */

	const { login, password } = req;

	let result;
	let _user;

	try {
		const db = this.client.db();

		_user = await db.collection('Users').findOne({ 'login': login, 'password': password });
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
			userID: _user['_id'],
			firstName: _user['firstName'],
			lastName: _user['lastName'],
			email: _user['email'],
			favorites: _user['favoriteNotes'],
			verified: _user['verified']
		},
		error: result['error'],
		result: result['errorObject']
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

function SendVerification(req, res, smtp, email, rand) {
	const mailOptions = {
		to: email,
		subject: 'Please confirm your Email account',
		html: 'Hello,<br> Please use the following code to verify your email address: <b>' + rand + '</b>.<br>'
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
	/*
	 * incoming: userID, rand
	 * outgoing: error: boolean, result: errorObj
	 */

	const { userID, rand } = req;

	const query = { $set: { 'verified': true } };
	let result;

	try {
		const db = this.client.db();

		result = await db.collection('Users').findOne({ _id: ObjectId(userID), verification: rand, verified: false });

		if (!result)
			throw 'No such user';
		await db.collection('Users').updateOne({ _id: ObjectId(userID) }, query);
		GetErrorObject(200);
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

UserAPI.prototype.PasswordRequest = async function(req, res, smtp) {
	/*
	 * incoming: email
	 * outgoing: error: boolean, result: errorObj
	 */

	const { email } = req;

	let result;
	let _user;

	try {
		const db = this.client.db();

		_user = await db.collection('Users').findOne({ 'email': email, 'verified': true });
		if (_user === null)
			throw 400;

		result = GetErrorObject(200);

		const newPass = GetRandomString(12);
		const newRand = GetRandomString(8);
		const query = { $set: { 'password': newPass, 'rand': newRand, 'resetPassword': true } };

		db.collection('Users').updateOne({ _id: ObjectId(_user['_id']) }, query);

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
		html: 'Hello,<br> Please use the following code to reset your password.<br>Your code is: <b>' + rand + '<\b>'
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
	let result;

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