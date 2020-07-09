import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './config/User';

const store = initialState => createStore(reducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
	<React.StrictMode>
		<Provider store = { store() }>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);