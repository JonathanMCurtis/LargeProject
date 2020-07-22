import React, { Component } from 'react';
import { CodeInput } from '../components/';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.css';

export default class VerifyEmail extends Component {
	render () {
		return (
			<div id = 'verify-email' className = 'pattern-dots-xl bg-success text-light'>
				<Form.Group controlId = 'verify-email-form'>
					<Form.Label><h3>Enter verification code:</h3></Form.Label>
					<CodeInput numInputs = { 6 } />
					<Button variant = 'primary' className = 'mb-4 btn btn-block'>Verify your email.</Button>

					<p className = 'text-muted text-center'>&copy; Study Share 2020</p>
				</Form.Group>
			</div>
		);
	}
}