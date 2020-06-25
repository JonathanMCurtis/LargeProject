import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import ApiRecipeTest from './pages/ApiRecipeTest';

function App() {
	return (
		<Router >
			<Switch>
				<Route path = "/" exact>
					<LoginPage />
				</Route>
				<Route path = "/cards" exact>
					<CardPage />
				</Route>
				<Route path = "/recipeTest" exact>
					<ApiRecipeTest />
				</Route>
				<Redirect to = "/" />
			</Switch>
		</Router>
	);
}

export default App;