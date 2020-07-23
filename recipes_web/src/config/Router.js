import React from 'react';
import { Home, Subject, ForgotPassword, Notes, VerifyPassword, Profile, About, Note, NoMatch } from '../pages';
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
						<Route exact path = '/note' component = { Note } />
						<Route exact path = '/profile' component = { Profile } />
						<Route exact path = '/about' component = { About } />
						<Route exact path = '/notes/:subject/:topic' render = { routerProps => <Notes router = { routerProps } /> } />
					</Route>
					<Route component = { NoMatch } />
				</Switch>
			</Switch>
		</BrowserRouter>
	);
};