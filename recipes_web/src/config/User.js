// Fetch URLs
const Login = 'https://studyshare21.herokuapp.com/api/LoginUser';
const CreateUser = 'https://studyshare21.herokuapp.com/api/CreateUser';
const UpdatePassword = 'https://studyshare21.herokuapp.com/api/UpdatePassword';
const ReVerification = 'https://studyshare21.herokuapp.com/api/ReVerification';
const PasswordRequest = 'https://studyshare21.herokuapp.com/api/PasswordRequest';
const ChangePassword = 'https://studyshare21.herokuapp.com/api/ChangePassword';
const AddFavorite = 'https://studyshare21.herokuapp.com/api/AddFavorite';
const Verification = 'https://studyshare21.herokuapp.com/api/VerifyUser';
const RemoveFavorite = 'https://studyshare21.herokuapp.com/api/RemoveFavorite';

// Actions Types
const ACTIONS = {
	CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
	CREATE_USER_FAIL: 'CREATE_USER_FAIL',
	LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
	LOAD_USER_FAIL: 'LOAD_USER_FAIL',
	RESET_PASSWORD: 'RESET_PASSWORD',
	UPDATE_PASSWORD: 'UPDATE_PASSWORD',
	RESEND_VERIFICATION: 'RESEND_VERIFICATION',
	UPDATE_FAVORITE: 'UPDATE_FAVORITE',
	LOGIN_GUEST: 'LOGIN_GUEST',
	VERIFY_EMAIL: 'VERIFY_EMAIL',
	LOG_OUT_USER: 'LOG_OUT_USER',
	CLOSE_BANNER: 'CLOSE_BANNER'
};

const initialState = {
	login: '',
	firstName: '',
	lastName: '',
	email: '',
	verified: false,
	favorites: {},
	loggedIn: false,
	guest: false,
	banner: true
};

export default (state = initialState, action) => {
	const { type, data } = action;
	const error = data && data.error && data.result;

	switch (type) {
		case ACTIONS.CREATE_USER_SUCCESS:
			return { ...state, ...data.userInfo, error };
		case ACTIONS.LOGIN_GUEST:
			return { ...state, banner: state.banner, guest: true };
		case ACTIONS.LOAD_USER_SUCCESS:
			return { ...state, loggedIn: true, ...data.userInfo };
		case ACTIONS.CREATE_USER_FAIL:
		case ACTIONS.LOAD_USER_FAIL:
			return { ...state, error };
		case ACTIONS.UPDATE_FAVORITE:
			return { ...state, favorites: data.favorites };
		case ACTIONS.RESET_PASSWORD:
			return { ...state, error, ...data.userInfo };
		case ACTIONS.UPDATE_PASSWORD:
		case ACTIONS.RESEND_VERIFICATION:
			return { ...state, error };
		case ACTIONS.VERIFY_EMAIL:
			return { ...state, error, verified: error && false };
		case ACTIONS.LOG_OUT_USER:
			return initialState;
		case ACTIONS.CLOSE_BANNER:
			return { ...state, banner: false };
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
 * @throws errorCode 401 if username already exists.
 * @throws errorCode 40X if email already exists.
 *
 * @param {Object} user  User Fields
 * @param {String} user.user
 * @param {String} user.password
 * @param {String} user.email
 * @param {String} user.firstName
 * @param {String} user.lastName
 */

export const createUser = user => {
	return dispatch => {
		return fetch(CreateUser, fetchPOST(user))
			.then(response => response.json())
			.then(data => {
				if (!data.error)
					dispatch({ type: 'CREATE_USER_SUCCESS', data });
				else
					dispatch({ type: 'CREATE_USER_FAIL', data });
			});
	};
};

/**
 * @description Logs in user given the login form fields.
 *
 * @throws errorCode 401 if the login info is incorrect.
 *
 * @param {Object} user  User fields
 * @param {String} user.login
 * @param {String} user.password
 */

export const loginUser = user => {
	return dispatch => {
		return fetch(Login, fetchPOST(user))
			.then(response => response.json())
			.then(data => {
				if (!data.error)
					dispatch({ type: 'LOAD_USER_SUCCESS', data });
				else
					dispatch({ type: 'LOAD_USER_FAIL', data });
			});
	};
};

/**
 * @description Logins user as guest.
 */

export const loginGuest = () => {
	return dispatch => dispatch({ type: 'LOGIN_GUEST' });
};

export const verifyEmail = user => {
	return dispatch => {
		return fetch(Verification, fetchPOST(user))
			.then(response => response.json())
			.then(data => dispatch({ type: 'VERIFY_EMAIL', data }));
	};
};

/**
 * @description Re-sends verification email.
 */

export const resendVerification = user => {
	return dispatch => {
		return fetch(ReVerification, fetchPOST(user))
			.then(response => response.json())
			.then(data => dispatch({ type: 'RESEND_VERIFICATION', data }));
	};
};

/**
 * @description Reset password and send code.
 *
 * @param {{userID: string}} user
 */

export const resetPassword = user => {
	return dispatch => {
		return fetch(PasswordRequest, fetchPOST(user))
			.then(response => response.json())
			.then(data => dispatch({ type: 'RESET_PASSWORD', data }));
	};
};

/**
 * @description Update password.
 *
 * @throws Error 401 if 'rand' is incorrect or MAJOR ERROR HAPPENED.
 *
 * @param {{userID: string, password: string, rand: string}
 *        |{userID: string, password: string, newPassword: string}} user
 */

export const updatePassword = user => {
	return dispatch => {
		return fetch((user.rand && UpdatePassword) || ChangePassword, fetchPOST(user))
			.then(response => response.json())
			.then(data => dispatch({ type: 'UPDATE_PASSWORD', data }));
	};
};

/**
 * @description Add or remove favorite based on action.
 *
 * @param {Object} IDs userID and noteID to be fetched
 * @param {String} IDs.userID
 * @param {String} IDs.noteID
 * @param {"add"|"remove"} action Action to fetch
 */

export const favorite = (IDs, action) => {
	return dispatch => {
		return fetch((action === 'add' && AddFavorite) || RemoveFavorite, fetchPOST(IDs))
			.then(response => response.json())
			.then(data => dispatch({ type: 'UPDATE_FAVORITE', data }));
	};
};

/**
 * @description Logs out user.
 */

export const logoutUser = () => {
	return dispatch => dispatch({ type: 'LOG_OUT_USER' });
};

export const closeBanner = () => {
	return dispatch => dispatch({ type: 'CLOSE_BANNER' });
};