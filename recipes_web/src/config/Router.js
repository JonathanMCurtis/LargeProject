import React from 'react';
import { Home, Subject, ForgotPassword, Notes, VerifyPassword } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Banner } from '../components';

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/forgot-password' component = { ForgotPassword } />
				<Route exact path = '/verify' component = { VerifyPassword } />
				<Switch>
					<Route>
						<Banner />
						<Route exact path = '/notes' component = { Subject } />
						<Route exact path = '/notes/:subject/:topic' render = { routerProps => <Notes router = { routerProps } /> } />
					</Route>
				</Switch>
			</Switch>
		</BrowserRouter>
	);
};