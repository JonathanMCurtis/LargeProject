import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Registration } from './';
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
				<p className = 'lead'>A place to find and share notes, and study with others!</p>
			</div>
		);
	}

	renderButtons () {
		const { loggedIn, guest } = this.props;

		return (
			(loggedIn || guest) && <Link className = 'btn btn-primary' to = '/subjects'>Take me back</Link>
				|| <ButtonGroup className = 'mx-auto'>
					<Button onClick = { () => this.setState({ animate: true, register: 'login' }) }>
						Login
					</Button>
					<Button variant = 'secondary' onClick = { () => this.setState({ animate: true, register: 'signup' }) }>
						Sign Up
					</Button>
				</ButtonGroup>
		);
	}

	render () {
		const { animate, register } = this.state;

		return (
			<div className = 'splash overflow-hidden text-center'>
				<div className = { animate && 'welcome splash-content' || 'splash-content' }>
					{ this.renderWelcomeText() }
					{ this.renderButtons() }
				</div>
				<div className = { animate && 'registration splash-content' }>
					{ animate && <Registration render = { register } /> }
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ loggedIn, guest }) => ({ loggedIn, guest });

export default connect(mapStateToProps)(Home);