const ObjectId = require('mongodb').ObjectId;
const GetErrorObject = require('API').GetErrorObject;

function UserAPI(clientRef) {
	this.client = clientRef;
}

UserAPI.prototype.CreateUser = async function(req, res, smtp) {
	/*
	 * incoming: firstName, lastName, login, password, email
	 * outgoing: userInfo: {userID, firstName, lastName, email}, result: errorObj
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
		favoriteNotes: [],
		verified: false,
		verification: rand
	};

	let result;

	try {
		const db = this.client.db();

		await db.collection('Users').insertOne(newUser);
		result = GetErrorObject('OK');
	}
	catch (e) {
		result = GetErrorObject('unknown', e.toString());
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
	 * outgoing: userInfo: {userID, firstName, lastName, email} or {}, result: errorObject
	 */

	const { login, password } = req;

	let result;
	let _user;

	try {
		const db = this.client.db();

		_user = await db.collection('Users').findOne({ 'login': login, 'password': password, 'verified': true });
		if (_user === null)
			throw 'No user found';
		else
			result = GetErrorObject('OK');
	}
	catch (e) {
		result = GetErrorObject('default', e.toString());

		let js = {
			userInfo: {
				userID: 'No user found',
				firstName: 'No user found',
				lastName: 'No user found',
				email: 'No user found'
			},
			result: result
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
		result: result
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

UserAPI.prototype.ValidateUser = async function(req, res) {
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
	// TODO: Replace with final URL, or environmental variable
	res.redirect('https://recipes21.herokuapp.com');

/*
 * res.setHeader('Content-Type', 'application/json');
 * res.end(JSON.stringify(js, null, 3));
 */
};

module.exports = UserAPI;