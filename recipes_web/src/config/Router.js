import React from 'react';
import { Home, SubjectHome, Matter } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/subjects' component = { SubjectHome } />
				<Route exact path = '/subjects/matters' component = { Matter } />
			</Switch>
		</BrowserRouter>
	);
};