import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RegistrationCard from '../components/RegistrationCard';

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
				<Button className = 'btn-block'>Send Verfication Email</Button>
				<Link className = 'btn btn-secondary btn-block mt-1' to = './'>Take me back</Link>
			</Form>
		);
	}

	render () {
		return (
			<RegistrationCard title = 'Forgot your password?' description = "Don't worry. Happens to the best of us. We got you.">
				{ this.renderVerifyForm() }
			</RegistrationCard>
		);
	}
}