import React, { Component } from 'react';
import Home from './Home';
import { connect } from 'react-redux';
import { createUser, loginUser } from './config/User';

class App extends Component {
	render() {
		return (
			<div>
				<Home />
			</div>
		);
	}
}

const mapDispatchToProps = { createUser, loginUser };
const mapStateToProps = ({ loggedIn, currentUser }) => ({ loggedIn, currentUser });

export default connect(mapStateToProps, mapDispatchToProps)(App);