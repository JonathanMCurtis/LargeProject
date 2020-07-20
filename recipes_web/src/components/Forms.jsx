import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Holds inputs for login modal
class Login extends Component {
	render () {
		return (
			<div className = 'login-body'>
				<Form>
					<Form.Group controlId = 'loginUsername'>
						<Form.Label>Username:</Form.Label>
						<Form.Control type = 'input'></Form.Control>
					</Form.Group>
					<Form.Group controlId = 'loginPassword'>
						<Form.Label>Password:</Form.Label>
						<Form.Control type = 'password'></Form.Control>
					</Form.Group>
					<Button variant = 'primary' type = 'submit' onClick = ''>
						Login
					</Button>
					<Link className = 'btn btn-outline-secondary ml-1' to = '/forgot-password'>Forgot password?</Link>
					<hr />
					<Link onClick = { () => this.props.onSubmit() }>Don't have an account? Sign up today!</Link>
				</Form>
			</div>
		);
	}
}

// Holds inputs for signup modal
class Signup extends Component {
	render () {
		return (
			<div className = 'signup-body'>
				<Form>
					<Form.Group controlId = 'signupFirstName'>
						<Form.Label>First name:</Form.Label>
						<Form.Control type = 'input'></Form.Control>
					</Form.Group>
					<Form.Group controlId = 'signupLastName'>
						<Form.Label>Last name:</Form.Label>
						<Form.Control type = 'input'></Form.Control>
					</Form.Group>
					<Form.Group controlId = 'signupEmail'>
						<Form.Label>Email:</Form.Label>
						<Form.Control type = 'email'></Form.Control>
					</Form.Group>
					<Button variant = 'primary' onClick = ''>Sign Up</Button>
					<hr />
					<Link onClick = { () => this.props.onSubmit() } className = 'small' to ='#'>Already have an account? Log in here!</Link>
				</Form>
			</div>
		);
	}
}

export { Login, Signup };