import React from 'react';
import { Home, Subject } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Banner } from '../components';
import ForgotPassword from '../pages/ForgotPassword';

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/forgot-password' component = { ForgotPassword } />
				<Switch>
					<Route>
						<Banner />
						<Route exact path = '/subjects' component = { Subject } />
					</Route>
				</Switch>
			</Switch>
		</BrowserRouter>
	);
};