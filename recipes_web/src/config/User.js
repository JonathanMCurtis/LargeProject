// Fetch URLs
const Login = 'http://localhost:3001/api/user/LoginUser';
const CreateUser = 'http://localhost:3001/api/user/CreateUser';

// Actions Types
const ACTIONS = {
	CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
	CREATE_USER_FAIL: 'CREATE_USER_FAIL',
	LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
	LOAD_USER_FAIL: 'LOAD_USER_FAIL',
	LOG_OUT_USER: 'LOG_OUT_USER'
};

const initialState = {
	Login: '',
	FirstName: '',
	LastName: '',
	favorites: {},
	loggedIn: false
};

export default (state = initialState, action) => {
	const { type, data } = action;

	switch (type) {
		case ACTIONS.LOAD_USER_SUCCESS:
			return { loggedIn: true, currentUser: data };
		case ACTIONS.CREATE_USER_FAIL:
		case ACTIONS.LOAD_USER_FAIL:
			return { currentUser: data };
		case ACTIONS.LOG_OUT_USER:
			return { ...initialState };
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
 * @description Creates new user given the input object on the form fields.
 *
 * @param {Object} user  User Fields
 * @param {String} user.User
 * @param {String} user.Password
 * @param {String} user.Email
 * @param {String} user.FirstName
 * @param {String} user.LastName
 */

export const createUser = user => {
	return dispatch => {
		return fetch(CreateUser, fetchPOST(user))
			.then(response => console.log(response))
			.then(data => {
				if (!data.ErrorID)
					dispatch({ type: 'CREATE_USER_SUCCESS', data });
				else
					dispatch({ type: 'CREATE_USER_FAIL', data });
			});
	};
};

/**
 * @description Logs in user given the login form fields.
 *
 * @param {Object} user  User fields
 * @param {String} user.Login
 * @param {String} user.Password
 */

export const loginUser = user => {
	return dispatch => {
		return fetch(Login, fetchPOST(user))
			.then(response => response.json())
			.then(data => {
				if (!data.ErrorID)
					dispatch({ type: 'LOAD_USER_SUCCESS', data });
				else
					dispatch({ type: 'LOAD_USER_FAIL', data });
			});
	};
};

/**
 * @description Logs out user.
 */

export const logoutUser = () => {
	return dispatch => {
		return dispatch({ type: 'LOG_OUT_USER' });
	};
};