const ObjectId = require('mongodb').ObjectId;

function UserAPI(clientRef) {
	this.client = clientRef;
}

UserAPI.prototype.CreateUser = async function(req, res, smtp) {
	/*
	 * incoming: firstName, lastName, login, password, email
	 * outgoing: userID, result
	 */

	/*
	 * TODO:
	 * 	Resend verification
	 * 	Unique UserID (More specific error)
	 *  Unique Email (More specific error)
	 *  Forgot my password
	 */

	const { firstName, lastName, login, password, email } = req;
	const rand = Math.floor((Math.random() * 100) + 54);

	const newUser = {
		firstName: firstName,
		lastName: lastName,
		login: login,
		password: password,
		email: email,
		favoritedNotes: [],
		verified: false,
		verification: rand
	};

	let result = '';

	try {
		const db = this.client.db();

		await db.collection('Users').insertOne(newUser);
	}
	catch (e) {
		result = e.toString();
	}

	let js = {
		userID: newUser['_id'],
		result: result
	};

	SendVerification(req, res, smtp, newUser['_id'], newUser['email'], rand);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.LoginUser = async function(req, res) {
	/*
	 * incoming: login, password
	 * outgoing: userID, result
	 */

	const { login, password } = req;

	let result = '';
	let _user;

	try {
		const db = this.client.db();

		_user = await db.collection('Users').findOne({ 'login': login, 'password': password, 'verified': true });
		if (_user === null)
			throw 'No user found';
	}
	catch (e) {
		result = e.toString();

		let js = {
			result: result
		};

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	let js = {
		userID: _user['_id'],
		result: result
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

function SendVerification(req, res, smtp, id, email, rand) {
	// TODO: Move over to main link
	const link = 'https://group21-dev-api.herokuapp.com/api/verify?id=' + id + '&val=' + rand;
	const mailOptions = {
		to: email,
		subject: 'Please confirm your Email account',
		html: 'Hello,<br> Please click on the link to verify your email.<br><a href=' + link + '>Click here to verify</a>'
	};

	console.log(mailOptions);
	smtp.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log(error);
			res.end('error');
		}
		else {
			console.log('Message sent: ' + JSON.stringify(response));
			res.end('sent');
		}
	});
	smtp.close();
}

UserAPI.prototype.ValidateUser = async function(req, res) {
	// TODO: Redirect after verifying user

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
		result: result
	};

	if (_results.length > 0)
		js.UserID = _results[0]['_id'];

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = UserAPI;