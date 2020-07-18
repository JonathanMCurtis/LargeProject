import React from 'react';
import { Component } from 'react';
import Form from 'react-bootstrap/Form';

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
					<Form.Group controlId = 'signupUsername'>
						<Form.Label>Username:</Form.Label>
						<Form.Control type = 'input'></Form.Control>
					</Form.Group>
					<Form.Group controlId = 'signupPassword'>
						<Form.Label>Password:</Form.Label>
						<Form.Control type = 'password'></Form.Control>
					</Form.Group>
					<Form.Group controlId = 'signupVerifyPwd'>
						<Form.Label>Verify your password:</Form.Label>
						<Form.Control type = 'password'></Form.Control>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

export { Login, Signup };