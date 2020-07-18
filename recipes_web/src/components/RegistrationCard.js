import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './styles.css';

export default class RegistrationCard extends Component {
	render() {
		const { title, description, children } = this.props;

		return (
			<div id = 'rc-background' className = 'h-100 w-100'>
				{ /* <Link className = 'btn btn-outline-primary mt-1 ml-1' to = '/'>Go Back</Link> */ }
				<div id = 'rc-form'>
					<h1 id = 'rc-title' className = 'mt-2 text-center font-weight-normal'>{ title }</h1>
					<h1 className = 'lead mb-4 text-center'>{ description }</h1>
					<hr />
					{ children }
					<span id = 'result'></span>
					<p className = 'mt-3 mb-2 text-muted text-center'>&copy; Study Share 2020</p>
				</div>
			</div>
		);
	}
}