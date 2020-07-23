// Fetch URLs
const CreateNote = 'https://studyshare21.herokuapp.com/api/CreateNote';
const GetNote = 'https://studyshare21.herokuapp.com/api/GetNote';
const GetNotes = 'https://studyshare21.herokuapp.com/api/GetNotes';
const GetSubmittedNotes = 'https://studyshare21.herokuapp.com/api/GetSubmittedNotes';
const GetFavoriteNotes = 'https://studyshare21.herokuapp.com/api/GetFavoriteNotes';
const Search = 'https://studyshare21.herokuapp.com/api/SearchByContent';
const UpdateNote = 'https://studyshare21.herokuapp.com/api/UpdateNote';
const DeleteNote = 'https://studyshare21.herokuapp.com/api/DeleteNote';

// Actions Types
const ACTIONS = {
	CREATE_NOTE_SUCCESS: 'CREATE_NOTE_SUCCESS',
	CREATE_NOTE_FAIL: 'CREATE_NOTE_FAIL',
	GET_NOTES: 'GET_NOTES',
	GET_SUBMITTED: 'GET_SUBMITTED',
	GET_FAVORITES: 'GET_FAVORITES',
	SEARCH_SUCCESS: 'SEARCH_SUCCESS',
	LOAD_NOTE_SUCCESS: 'LOAD_NOTE_SUCCESS',
	LOAD_NOTE_FAIL: 'LOAD_NOTE_FAIL',
	UPDATE_NOTE_SUCCESS: 'UPDATE_NOTE_SUCCESS',
	UPDATE_NOTE_FAIL: 'UPDATE_NOTE_FAIL'
};

const initialState = {
	currentNote: {},
	submitted: [],
	notes: []
};

export default (state = initialState, action) => {
	const { type, data } = action;
	const error = data && data.error && data.result;

	switch (type) {
		case ACTIONS.CREATE_NOTE_SUCCESS:
			return { ...state, currentNote: { noteID: data.noteID }, error };
		case ACTIONS.UPDATE_NOTE_SUCCESS:
		case ACTIONS.LOAD_NOTE_SUCCESS:
			return { ...state, currentNote: data.note, error };
		case ACTIONS.CREATE_NOTE_FAIL:
		case ACTIONS.LOAD_NOTE_FAIL:
			return { ...state, error };
		case ACTIONS.GET_NOTES:
		case ACTIONS.GET_FAVORITES:
		case ACTIONS.GET_SUBMITTED:
		case ACTIONS.SEARCH_SUCCESS:
			return { ...state, notes: data.notes, error };
		case ACTIONS.UPDATE_NOTE_FAIL:
			return { ...state, error };
		default:
			return state;
	}
};

const fetchPOST = body => {
	return ({
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
};

/**
 * @description Creates new note given the input object on the form fields.
 *
 * @throws Error 409 if note already exists.
 *
 * @param {Object} note  note Fields
 * @param {String} note.title
 * @param {String} note.subject
 * @param {String} note.topic
 * @param {String} note.content
 * @param {String} note.url
 * @param {String} note.userID
 */

export const createNote = note => {
	return dispatch => {
		return fetch(CreateNote, fetchPOST(note))
			.then(response => response.json())
			.then(data => {
				if (!data.error)
					dispatch({ type: 'CREATE_NOTE_SUCCESS', data });
				else
					dispatch({ type: 'CREATE_NOTE_FAIL', data });
			});
	};
};

export const loadNote = note => {
	return dispatch => {
		return fetch(GetNote, fetchPOST(note))
			.then(response => response.json())
			.then(data => {
				if (!data.error)
					dispatch({ type: 'LOAD_NOTE_SUCCESS', data });
				else
					dispatch({ type: 'LOAD_NOTE_FAIL', data });
			});
	};
};

export const getNotes = (note, action) => {
	return dispatch => {
		return fetch(action === 'submitted'
			? GetSubmittedNotes : action === 'favorites'
				? GetFavoriteNotes : GetNotes, fetchPOST(note))
			.then(response => response.json())
			.then(data => {
				switch (action) {
					case 'submitted':
						dispatch({ type: 'GET_SUBMITTED', data });
						break;
					case 'favorites':
						dispatch({ type: 'GET_FAVORITES', data });
						break;
					default:
						dispatch({ type: 'GET_NOTES', data });
				}
			});
	};
};

export const search = query => {
	return dispatch => {
		return fetch(Search, fetchPOST(query))
			.then(response => response.json())
			.then(data => dispatch({ type: 'SEARCH_SUCCESS', data }));
	};
};

export const editNote = note => {
	return dispatch => {
		return fetch(UpdateNote, fetchPOST(note))
			.then(response => response.json())
			.then(data => {
				if (!data.error)
					dispatch({ type: 'UPDATE_NOTE_SUCCESS', data });
				else
					dispatch({ type: 'UPDATE_NOTE_FAIL', data });
			});
	};
};

export const deleteNote = note => {
	return dispatch => {
		return fetch(DeleteNote, fetchPOST(note))
			.then(response => response.json())
			.then(data => dispatch({ type: 'DELETE_NOTE_SUCCESS', data }));
	};
};