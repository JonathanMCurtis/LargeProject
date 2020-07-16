/*
 * 	All API endpoints will return an 'error' field, and a 'result' field, containing one of these error objects
 * So error information is provided as follows:
 * error: (true if an error exists, false otherwise)
 * result: {
 * 		errorCode: 	( More specific error code, always an integer )
 * 		errorMsg:	( Human-readable message describing the error, or lack thereof )
 * }
 */
module.exports.GetErrorObject = function(errorType, msg = 'N/A') {
	let error = true;
	let errorCode = 418;
	let errorMsg = "I'm a teapot";

	switch (errorType) {
		case 200:
		case 201:
			error = false;
			errorCode = errorType;
			errorMsg = 'OK';
			break;
		default:
			error = true;
			errorCode = errorType;
			errorMsg = msg;
	}

	return {
		error: error,
		errorObject: {
			errorCode: errorCode,
			errorMsg: errorMsg
		}
	};
};

// Dictates which fields of our notes table are returned when displaying search results
module.exports.GetNotesProjection = function() {
	return {
		_id: 1,
		title: 1,
		subject: 1,
		topic: 1,
		submissionDate: 1,
		favoriteCount: 1
	};
};

module.exports.GetRandomString = function(length) {
	let ret = '';

	for (let i = 0; i < length; i++) {
		const rand = 'a' + (Math.floor(Math.random() * 26));

		ret += rand;
	}

	return ret;
};

// Number of results to return per page
module.exports.size = 15;