import React, { Component } from 'react';

export default class Registration extends Component {
	render() {
		return (
			<div className = 'h-100'>
				<h1 className = 'text-white'>Gonna edit { this.props.render }!</h1>
			</div>
		);
	}
}