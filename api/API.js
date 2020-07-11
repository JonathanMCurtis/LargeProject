/*
 * 	All API endpoints will return a 'result' field, containing one of these error objects
 * The error object will always be in the following format:
 * {
 * 		error: 		( true if an error is present, false otherwise )
 * 		errorCode: 	( More specific error code, always an integer )
 * 		errorMsg:	( Human-readable message describing the error, or lack thereof )
 * }
 */
module.exports.GetErrorObject = function(errorType, msg = 'N/A') {
	let error = true;
	let errorCode = 418;
	let errorMsg = "I'm a teapot";

	switch (errorType) {
		case 'OK':
			error = false;
			errorCode = 200;
			errorMsg = 'OK';
			break;
		default:
			error = true;
			errorCode = -1;
			errorMsg = msg;
	}

	return {
		error: error,
		errorCode: errorCode,
		errorMsg: errorMsg
	};
};

// Dictates which fields of our notes table are returned when displaying search results
module.exports.GetNotesProjection = function() {
	return {
		_id: 1,
		title: 1,
		subject: 1,
		submissionDate: 1,
		favoriteCount: 1
	};
};

// Number of results to return per page
module.exports.size = 15;