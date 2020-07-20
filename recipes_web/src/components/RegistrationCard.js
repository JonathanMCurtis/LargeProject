import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './styles.css';

export default class RegistrationCard extends Component {
	render() {
		const { title, description, children } = this.props;

		return (
			<div className = 'card text-center'>
				<Row className = 'h-100'>
					<Col className = 'h-100 card-content'>
						<h2 className = 'my-2'>{ title }</h2>
						{ description && <h3 className = 'lead mb-3 text-center'>{ description }</h3> }
						<hr></hr>
						<div className = 'card-content'>
							{ children }
							<p className = 'text-muted mt-auto mb-0'>&copy; Study Share 2020</p>
						</div>
					</Col>
					<Col sm = { 8 } className = 'card-small'>
						<h1>Hey, bitch</h1>
					</Col>
				</Row>
			</div>
		);
	}
}