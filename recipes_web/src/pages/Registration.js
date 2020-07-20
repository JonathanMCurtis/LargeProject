import React, { Component } from 'react';
import RegistrationCard from '../components/RegistrationCard';
import { Login, Signup } from '../components/Forms.jsx';

export default class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = { register: this.props.render };
	}

	render() {
		const { register } = this.state;

		return (
			(register === 'login' && <RegistrationCard title = 'Log into your account'>
				<Login onSubmit = { () => this.setState({ register: 'signup' }) } />
			</RegistrationCard>)
			|| <RegistrationCard title = 'Create your new account'>
				<Signup onSubmit = { () => this.setState({ register: 'login' }) } />
			</RegistrationCard>
		);
	}
}