import React, { Component, useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { closeBanner } from '../config';

const BannerComponent = ({ children, onClose }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(() => setShow(true), 1000);
	}, []);

	return (
		<Collapse in = { show }>
			<div className = 'm-0'>
				<Table size = 'md' className = 'm-0 banner font-weight-bold'>
					<tbody>
						<tr>
							<td className = 'w-100 text-left pl-4'>
								{ children }
							</td>
							<td className = 'text-right pr-4 align-middle'>
								<MdClose onClick = { () => { setShow(false); onClose && setTimeout(() => onClose(), 1000) } } size = '25px' />
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</Collapse>
	);
};

class Banner extends Component {
	render() {
		const { guest, verified, loggedIn, banner, closeBanner } = this.props;

		let guestMessage = <>
			You are currently logged in as a guest and won't be able to add or save notes. { ' ' }
			<Link to = '/' >Login or sign up by clicking here.</Link>
		</>;

		let unverifiedMessage = <>
			You have not verified your email and won't be able to add or save notes. { ' ' }
			<Link to = '/verify'>Click here to verify your email.</Link>
		</>;

		return (
			banner && ((loggedIn && !verified) || guest) && <BannerComponent onClose = { () => closeBanner() }>
				{ (guest && guestMessage) || (!verified && loggedIn && unverifiedMessage) }
			</BannerComponent> || null
		);
	}
}

const mapStateToProps = ({ user: { guest, verified, loggedIn, banner } }) => ({ guest, verified, loggedIn, banner });
const mapDispatchToProps = { closeBanner };

export default connect(mapStateToProps, mapDispatchToProps)(Banner);