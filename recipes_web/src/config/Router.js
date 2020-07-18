import React from 'react';
import { Home, Subject, Matter } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/subjects' component = { Subject } />
				<Route exact path = '/subjects/matters' component = { Matter } />
				<Route exact path = '/forgot-password' component = { ForgotPassword } />
			</Switch>
		</BrowserRouter>
	);
};