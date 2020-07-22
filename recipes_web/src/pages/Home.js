import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Registration } from './';
import { loginGuest } from '../config';
import './styles.css';

class Home extends Component {
	constructor (props) {
		super(props);

		this.state = { animate: false, register: '' };
	}

	renderWelcomeText () {
		return (
			<div className = 'text-white mb-5 typewriter'>
				<h1 className = 'display-1'>Welcome to Study Share</h1>
				<div className = 'typewriter-container'>
					<p className = 'lead'>A place to find and share notes, and study with others!</p>
				</div>
			</div>
		);
	}

	renderButtons () {
		const { loggedIn, loginGuest } = this.props;

		return (
			(loggedIn && <Link className = 'btn btn-primary' to = '/subjects'>Take me back!</Link>)
				|| <>
					<ButtonGroup className = 'mx-auto pb-2'>
						<Button onClick = { () => this.setState({ animate: true, register: 'login' }) }>
							Login
						</Button>
						<Button variant = 'secondary' onClick = { () => this.setState({ animate: true, register: 'signup' }) }>
							Sign Up
						</Button>
					</ButtonGroup>
					<p>
						<Link className = 'btn btn-primary' to = '/subjects' onClick = { () => loginGuest() }>Continue as guest</Link>
					</p>
				</>
		);
	}

	render () {
		const { animate, register } = this.state;

		return (
			<div className = 'splash overflow-hidden text-center'>
				<div className = { (animate && 'welcome splash-content w-75') || 'splash-content w-75' }>
					{ this.renderWelcomeText() }
					{ this.renderButtons() }
				</div>
				<div className = { (animate && 'registration splash-content') || '' }>
					{ animate && <Registration render = { register } /> }
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn });
const mapDispatchToProps = { loginGuest };

export default connect(mapStateToProps, mapDispatchToProps)(Home);