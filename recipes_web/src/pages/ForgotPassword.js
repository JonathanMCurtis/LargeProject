import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { connect } from 'react-redux';
import { RegistrationCard, ForgotPasswordForm, CodeInput } from '../components';
import { resetPassword, updatePassword } from '../config';
import md5 from 'md5';

class ForgotPassword extends Component {
	constructor(props) {
		super(props);

		this.state = { sent: false };
	}

	async reset(email) {
		const { resetPassword } = this.props;

		await resetPassword({ email });

		const { error } = this.props;
	
		if (!error) this.setState({ sent: true });
	}

	async update(code) {
		const { updatePassword, userID } = this.props;

		await updatePassword({ userID, password: md5(this.password.value), rand: code });
	}

	render () {
		const { sent } = this.state;
		const { resetPassword } = this.props;
	
		return (
			<div className = 'page pattern-cross-dots-xl bg-primary text-dark'>
				<div className = 'splash-content'>
					<RegistrationCard solo = 'w-50' title = 'Forgot your password?' description = "Don't worry, it happens to the best of us. We got you.">
						<Collapse in = { sent }>
							<div className = 'alert alert-success'>
								If this email is registered, a code has been sent to the email.
							</div>
						</Collapse>
						<ForgotPasswordForm onSubmit = { ({ email }) => this.reset(email) } />
						<Collapse in = { sent }>
							<div className = 'pt-3'>
							<Form.Group className = 'text-left text-weight-bold' controlId = 'resetPassword'>
								<Form.Label>New password</Form.Label>
								<Form.Control ref = { ref => this.password = ref } type = 'password' placeholder = 'Password' />
							</Form.Group>
							<CodeInput numInputs = { 6 } onSubmit = { code => this.update(code) } buttonTitle = 'Reset password' />
							</div>
						</Collapse>
					</RegistrationCard>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ user: { userID, error } }) => ({ userID, error });
const mapDispatchToProps = { resetPassword, updatePassword };
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);