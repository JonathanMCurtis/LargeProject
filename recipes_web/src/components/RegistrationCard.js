import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { icon } from '../data/images';
import './styles.css';

export default class RegistrationCard extends Component {
	render() {
		const { title, description, children } = this.props;

		return (
			<div className = 'card text-center border-0 overflow-hidden'>
				<Table>
					<tbody>
						<tr className = 'border-0'>
							<td id = 'left' className = 'px-5 border-0'>
								<div className = 'my-auto'>
									<img className = 'mx-auto py-4' src = { icon } width = '25%' />
									<h3 className = 'pb-4'>{ title }</h3>
									{ description && <h3 className = 'lead pt-n4 pb-4'>{ description }</h3> }
									{ children }
									<p className = 'text-muted py-4'>&copy; Study Share 2020</p>
								</div>
							</td>
							<td id = 'right' className = 'align-middle pattern-zigzag-xl text-right border-0 '>
								<h1 className = 'display-2 text-light'>Study Share</h1>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}