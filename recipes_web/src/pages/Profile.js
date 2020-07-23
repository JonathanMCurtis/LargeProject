import React, { Component } from 'react';
import { NavBar, RegistrationCard } from '../components';
import { Button, Table } from 'react-bootstrap/';
import { FaCog, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';

class Profile extends Component {
	render() {
		const { loggedIn, firstName, email } = this.props;

		return (
			<>
				<NavBar />
				<div className = 'page pattern-zigzag-xl bg-white text-success'>
					{ loggedIn && <>
						<h1 className = 'text-primary'>Logged in as <span className = 'text-secondary'>{ firstName }</span></h1>
						<Table>
							<tbody>
								<tr className = 'border-0'>
									<td id = 'profile-left' className = 'border-0'>
										<Link to = '/submitted' className = 'btn btn-primary btn-block'>My Notes</Link>
									</td>
									<td id = 'profile-right' className = 'align-middle text-right border-0'>
										<Link to = '/saved' className = 'btn btn-secondary btn-block'>Saved Notes <FaBookmark /></Link>
									</td>
								</tr>
							</tbody>
						</Table>
					</>
					|| <div className = 'splash-content'>
						<RegistrationCard solo = 'w-50' className = 'w-25'>
							<p className = 'lead'>You don't seem to be logged in.</p>
							<Link to = '/'>Login in here!</Link>
						</RegistrationCard></div> }
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ user: { loggedIn, firstName, email } }) => ({ loggedIn, firstName, email });

export default connect(mapStateToProps)(Profile);