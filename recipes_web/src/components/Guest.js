import React, { Component } from 'react';
import { loginGuest } from '../config';
import { connect } from 'react-redux';

class Guest extends Component {
	render() {
		const { guest, loggedIn, loginGuest } = this.props;

		(!guest || !loggedIn) && loginGuest();

		return (
			<></>
		);
	}
}

const mapStateToProps = ({ loggedIn, guest }) => ({ loggedIn, guest });
const mapDispatchToProps = { loginGuest };

export default connect(mapStateToProps, mapDispatchToProps)(Guest);