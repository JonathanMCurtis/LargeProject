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
				<Route exact path = '/notes/new-note' render = { () => <Note action = 'create' /> } />
				<Route exact path = '/notes/submitted' render = { () => <Notes action = 'submitted' /> } />
				<Route exact path = '/notes/saved' render = { () => <Notes action = 'favorites' /> } />
				<Switch>
					<Route>
						<Banner />
						<Route exact path = '/note' component = { Note } />
						<Route exact path = '/profile' component = { Profile } />
						<Route exact path = '/about' component = { About } />
						<Switch>
							<Route exact path = '/notes' component = { Subject } />
							<Route exact path = '/notes/search' render = { () => <Notes action = 'search' /> } />
							<Route exact path = '/notes/:subject/:topic' render = { routerProps => <Notes router = { routerProps } /> } />
							<Route exact path = '/notes/:id' render = { routerProps => <Note router = { routerProps } action = 'load' /> } />
						</Switch>
					</Route>
					<Route component = { NoMatch } />
				</Switch>
			</Switch>
		</BrowserRouter>
	);
};