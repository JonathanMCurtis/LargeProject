import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { user, note } from './config';
import 'pattern.css/dist/pattern.min.css';
import './custom.scss';

const store = initialState => createStore(combineReducers({ user, note }), initialState, applyMiddleware(thunk));

ReactDOM.render(
	<React.StrictMode>
		<Provider store = { store() }>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);