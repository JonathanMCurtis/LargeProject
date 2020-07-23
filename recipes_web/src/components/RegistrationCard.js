import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { icon } from '../data/images';
import './styles.css';

const patterns = ['dots', 'cross-dots', 'diagonal-lines', 'vertical-lines', 'horizontal-lines',
	'diagonal-stripes', 'vertical-stripes', 'horizontal-stripes', 'triangles', 'zigzag'];

export class RegistrationCard extends Component {
	render() {
		const { title, description, children, solo } = this.props;

		let pattern = Math.floor(Math.random() * patterns.length);

		return (
			<div className = { 'card text-center border-0 overflow-hidden ' + solo || '' } >
				<Table>
					<tbody>
						<tr className = 'border-0'>
							<td id = 'left' className = 'px-5 border-0'>
								<div className = 'my-auto'>
									<img className = 'mx-auto py-4' src = { icon } width = '25%' />
									<h3 className = 'pb-1'>{ title }</h3>
									{ description && <h3 className = 'lead pt-n4 pb-4'>{ description }</h3> }
									{ children }
									<p className = 'text-muted pt-5 py-4'>&copy; Study Share 2020</p>
								</div>
							</td>
							{ !solo && <td id = 'right' className = { `align-middle text-right border-0 pattern-${patterns[pattern]}-xl` }>
								<h1 className = 'display-2 text-dark'>Study Share</h1>
							</td>
							}
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}