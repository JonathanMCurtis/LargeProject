import React from 'react';
import { Home, Subject } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/subjects' component = { Subject } />
			</Switch>
		</BrowserRouter>
	);
};