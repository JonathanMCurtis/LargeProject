// // Fetch URLs
// const CreateNote = 'http://localhost:27017/api/CreateNote';
// const LoadNote = 'http://localhost:27017/api/GetNote';
// const GetNotes = 'http://localhost:27017/api/GetNotes';
// const GetSubmittedNotes = 'http://localhost:27017/api/GetSubmittedNotes';
// const Search = 'http://localhost:27017/api/SearchByContent';
// const UpdateNote = 'http://localhost:27017/api/UpdateNote';
// const DeleteNote = 'http://localhost:27017/api/DeleteNote';


// // Actions Types
// const ACTIONS = {
// 	CREATE_NOTE_SUCCESS: 'CREATE_NOTE_SUCCESS',
// 	CREATE_NOTE_FAIL: 'CREATE_NOTE_FAIL',
// 	LOAD_NOTE_SUCCESS: 'LOAD_NOTE_SUCCESS',
// 	LOAD_NOTE_FAIL: 'LOAD_NOTE_FAIL',
// 	UPDATE_NOTE_SUCCESS: 'UPDATE_NOTE_SUCCESS',
// 	UPDATE_NOTE_FAIL: 'UPDATE_NOTE_FAIL'
// };

// const initialState = {
// 	currentNote: {},
// 	submitted: [],
// 	notes: [],
// 	search: []
// };

// export default (state = initialState, action) => {
// 	const { type, data } = action;

// 	switch (type) {
// 		case ACTIONS.CREATE_NOTE_SUCCESS:
// 		case ACTIONS.UPDATE_NOTE_SUCCESS:
// 			return { ...state, ...data };
// 		case ACTIONS.LOGIN_GUEST:
// 			return { ...initialState, guest: true };
// 		case ACTIONS.LOAD_NOTE_SUCCESS:
// 			return { loggedIn: true, ...NOTEInfo };
// 		case ACTIONS.CREATE_NOTE_FAIL:
// 		case ACTIONS.LOAD_NOTE_FAIL:
// 			return { err };
// 		case ACTIONS.UPDATE_NOTE_FAL:
// 			return { ...state, err };
// 		case ACTIONS.LOG_OUT_NOTE:
// 			return { ...initialState };
// 		default:
// 			return state;
// 	}
// };

// const fetchPOST = body => {
// 	return ({
// 		method: 'POST',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(body)
// 	});
// };

// /**
//  * @description Creates new note given the input object on the form fields.
//  *
//  * @throws Error 409 if note already exists.
//  *
//  * @param {Object} note  note Fields
//  * @param {String} note.title
//  * @param {String} note.subject
//  * @param {String} note.topic
//  * @param {String} note.content
//  * @param {String} note.url
//  * @param {String} note.userID
//  */

// export const createNote = note => {
// 	return dispatch => {
// 		return fetch(CreateNote, fetchPOST(note))
// 			.then(response => response.json())
// 			.then(data => {
// 				if (!data.error)
// 					dispatch({ type: 'CREATE_NOTE_SUCCESS', data });
// 				else
// 					dispatch({ type: 'CREATE_NOTE_FAIL', data });
// 			});
// 	};
// };

