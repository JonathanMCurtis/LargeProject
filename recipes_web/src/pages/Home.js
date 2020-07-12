import React, { Component } from 'react';
import { Login } from '../components/Forms';
import { Signup } from '../components/Forms';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles.css';

class Home extends Component {
	constructor (props) {
		super(props);
		this.state = { loginModal: false, signupModal: false };
	}

	// Render functions for the modal forms

	renderLoginModal () {
		return (
			<Modal centered show = { this.state.loginModal } onHide = { () => this.setState({ loginModal: false }) }>
				<Modal.Header closeButton>
					<Modal.Title>Please log into your account:</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Login />
				</Modal.Body>
				<Modal.Footer>
					<Button variant = "success">Login</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	renderSignupModal () {
		return (
			<Modal centered show = { this.state.signupModal } onHide = { () => this.setState({ signupModal: false }) }>
				<Modal.Header closeButton>
					<Modal.Title>Please log into your account:</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Signup />
				</Modal.Body>

				<Modal.Footer>
					<Button variant = "success">Sign Up</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	renderWelcomeText () {
		return (
			<div className = "text-white text-center mt-5">
				<h1 className = "display-1">Welcome to Study Share!</h1>
				<p className = "lead">A place to find share your notes and study with others!</p>
			</div>
		);
	}

	renderButtons () {
		return (
			<div className = "d-flex justify-content-center">
				<Button className = "mr-2"
					variant = "primary"
					size = "lg"
					onClick = { () => this.setState({ loginModal: true }) }>Login
				</Button>
				<Button variant = "secondary"
					size = "lg"
					onClick = { () => this.setState({ signupModal: true }) }>Sign Up
				</Button>
			</div>
		);
	}

	render () {
		return (
			<>
				{ this.renderLoginModal() }
				{ this.renderSignupModal() }
				<div className = 'mh-100'>
					{ this.renderWelcomeText() }
					{ this.renderButtons() }
				</div>
			</>
		);
	}
}

export default Home;