import React, { Component } from 'react';
import { CodeInput } from '../components/';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RegistrationCard } from '../components';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import { verifyEmail } from '../config';
import { connect } from 'react-redux';
import './styles.css';

class Verify extends Component {
	constructor(props) {
		super(props);

		this.state = { renderError: false, renderMessage: false };
	}

	async verify(code) {
		this.setState({ renderError: false });
		const { userID, verifyEmail } = this.props;

		await verifyEmail({ userID, rand: code });

		const { error } = this.props;

		if (error) this.setState({ renderError: true });
		else this.setState({ renderMessage: true });
	}

	render () {
		return (
			<div id = 'verify-email' className = 'page pattern-dots-xl bg-success text-light'>
				<div className = 'splash-content'>
					<RegistrationCard solo = 'w-50' className = 'w-25'>
						{ true && <><Form.Group controlId = 'verify-email-form'>
							<Form.Label><h3>Enter verification code</h3></Form.Label>
							<CodeInput numInputs = { 6 } onSubmit = { code => this.verify(code) } buttonTitle = 'Verify your email' />
						</Form.Group>
						<Collapse in = { this.state.renderError }>
							<div className = 'alert alert-danger mt-2'>Incorrect code</div>
						</Collapse>
						<Collapse in = { this.state.renderMessage }>
							<div className = 'mt-2'>
								<Button variant = 'success' onClick = { () => this.props.history.goBack() }>
									Email verified. Click here to go back.
								</Button>
							</div>
						</Collapse> </> || <>
							<p className = 'lead'>You don't seem to be logged in.</p>
							<Link to = '/'>Login in here!</Link>
						</> }
					</RegistrationCard>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = { verifyEmail };
const mapStateToProps = ({ user: { userID, error, loggedIn } }) => ({ userID, error, loggedIn });

export default connect(mapStateToProps, mapDispatchToProps)(Verify);