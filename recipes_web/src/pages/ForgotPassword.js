import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RegistrationCard, ForgotPasswordForm } from '../components';

export default class ForgotPassword extends Component {
	renderVerifyForm () {
		return (
			<Form>
				<Form.Group controlId = 'verifyEmailForm'>
					<Form.Label className = 'mb-0'>Email Address:</Form.Label>
					<Form.Control type = 'email' placeholder = 'Enter your email...' />
				</Form.Group>
				<Form.Group controlId = 'verifyUsernameForm'>
					<Form.Label className = 'mb-0'>Username:</Form.Label>
					<Form.Control type = 'test' placeholder = 'Enter your username...'></Form.Control>
				</Form.Group>
				<Button>Send Verification Email</Button>
			</Form>
		);
	}

	render () {
		return (
			<div className = 'page pattern-cross-dots-xl bg-primary text-dark'>
				<div className = 'splash-content'>
					<RegistrationCard solo = 'w-50' title = 'Forgot your password?' description = "Don't worry, it happens to the best of us. We got you.">
						<ForgotPasswordForm />
					</RegistrationCard>
				</div>
			</div>
		);
	}
}