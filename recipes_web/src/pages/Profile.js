import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { Button, Table } from 'react-bootstrap/';
import { FaCog, FaBookmark } from 'react-icons/fa';
import './styles.css';

export default class Profile extends Component {
	render() {
		return (
			<div className = 'page pattern-zigzag-xl bg-white text-success'>
				<NavBar />
				<h1 className = 'text-primary'>Logged in as <span className = 'text-secondary'>User</span></h1>

				<Table>
					<tbody>
						<tr className = 'border-0'>
							<td id = 'profile-left' className = 'border-0'>
								<Button className = 'btn-block'>My Notes</Button>
							</td>
							<td id = 'profile-right' className = 'align-middle text-right border-0'>
								<Button variant = 'secondary' className = 'btn-block'>Favorites <FaBookmark /></Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}