import React, { Component } from 'react';
import { RegistrationCard, LoginForm, SignUpForm } from '../components';
import { Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import { connect } from 'react-redux';
import { loginUser, createUser } from '../config';
import md5 from 'md5';

class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = { register: this.props.render, error: false };
	}

	async login({ login, password }) {
		this.setState({ error: false });
		await this.props.loginUser({ login, password: md5(password) });

		const { error } = this.props;

		if (error) this.setState({ error: true });

		return error;
	}

	async signUp({ firstName, lastName, email, login, password }) {
		this.setState({ error: false });
		await this.props.createUser({ firstName, lastName, email, login, password: md5(password) });

		const { error } = this.props;

		if (error) this.setState({ error: true });

		return error;
	}

	render() {
		const { register, error } = this.state;

		return (
			(register === 'login' && <RegistrationCard title = 'Log into your account'>
				<button className = 'button-link text-primary' onClick = { () => this.setState({ register: 'signup' }) }>Don't have an account? Sign up today!</button>
				<Collapse in = { error }>
					<div className = 'alert alert-danger mt-2'>Incorrect username or password</div>
				</Collapse>
				<LoginForm onSubmit = { values => this.login(values) } />
				<Link className = 'py-3' to = '/forgot-password'>Forgot password?</Link>
			</RegistrationCard>)
			|| <RegistrationCard title = 'Create your new account'>
				<button className = 'button-link text-primary' onClick = { () => this.setState({ register: 'login' }) }>Already have an account? Log in here!</button>
				<Collapse in = { error }>
					<div className = 'alert alert-danger mt-2'>Email already in use</div>
				</Collapse>
				<SignUpForm onSubmit = { values => this.signUp(values) } />
			</RegistrationCard>
		);
	}
}

const mapStateToProps = ({ user: { error } }) => ({ error });
const mapDispatchToProps = { loginUser, createUser };

export default connect(mapStateToProps, mapDispatchToProps)(Registration);