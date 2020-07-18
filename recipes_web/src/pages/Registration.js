import React, { Component } from 'react';
import RegistrationCard from '../components/RegistrationCard';
import { Login, Signup } from '../components/Forms';

export default class Registration extends Component {
	render() {
		if (this.props.render === 'login') {
			return (
				<RegistrationCard title = 'Log into your account!' description = ''>
					<Login />
				</RegistrationCard>
			);
		}
		else {
			return (
				<RegistrationCard title = 'Create your new account!' description = ''>
					<Signup />
				</RegistrationCard>
			);
		}
	}
}