const ObjectId = require('mongodb').ObjectId;

function UserAPI(clientRef) {
	this.client = clientRef;
}

UserAPI.prototype.CreateUser = async function(req, res, smtp) {
	/*
	 * incoming: FirstName, LastName, Login, Password, Email
	 * outgoing: UserID, Result
	 */

	/*
	 * TODO:
	 * 	Resend verification
	 * 	Unique UserID (More specific error)
	 *  Unique Email (More specific error)
	 *  Forgot my password
	 */

	const { FirstName, LastName, Login, Password, Email } = req;
	const rand = Math.floor((Math.random() * 100) + 54);

	const newUser = {
		FirstName: FirstName,
		LastName: LastName,
		Login: Login,
		Password: Password,
		Email: Email,
		UserFavorites: [],
		Verified: false,
		Verification: rand
	};

	let Error = '';

	try {
		const db = this.client.db();
		const uniqueEmail = db.collection('Users').findOne({ Email: newUser['Email'] });
		const uniqueLogin = db.collection('Users').findOne({ Login: newUser['Login'] });

		if (uniqueEmail !== null)
			throw 'Email already exists';
		else if (uniqueLogin !== null)
			throw 'Login already in-use';

		await db.collection('Users').insertOne(newUser);
	}
	catch (e) {
		Error = e.toString();
	}

	let js = {
		UserID: newUser['_id'],
		Result: Error
	};

	SendVerification(req, res, smtp, newUser['_id'], newUser['Email'], rand);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

UserAPI.prototype.LoginUser = async function(req, res) {
	/*
	 * incoming: Login, Password
	 * outgoing: UserID, Result
	 */

	const { Login, Password } = req;

	let Error = '';
	let _result;

	try {
		const db = this.client.db();

		_result = await db.collection('Users').findOne({ 'Login': Login, 'Password': Password, 'Verified': true });
		if (_result === null)
			throw 'No user found';
	}
	catch (e) {
		Error = e.toString();

		let js = {
			Result: Error
		};

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(js, null, 3));
	}

	let js = {
		UserID: _result['UserID'],
		Result: Error
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

function SendVerification(req, res, smtp, id, email, rand) {
	const link = 'http://localhost:3001/api/user/verify?id=' + id + '&val=' + rand;
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
	/*
	 * incoming: UserID, ValidationString
	 * outgoing: UserID, Result
	 */

	// TODO: Redirect after verifying user

	let Error = '';
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
		Error = e.toString();
	}

	let js = {
		Result: Error
	};

	if (_results.length > 0)
		js.UserID = _results[0]['_id'];

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(js, null, 3));
};

module.exports = UserAPI;