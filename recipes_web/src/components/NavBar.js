import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink, Link } from 'react-router-dom';

export default class NavBar extends Component {
	render () {
		const { background } = this.props;

		return (
			<Navbar
				className = { (!background && 'bg-dark') || '' }
				style = {{ 'backgroundColor': background }}
				variant = 'dark' sticky = 'top'
			>
				<Container>
					<Navbar.Brand>
						<Link to = '/'>Study Share</Link>
					</Navbar.Brand>
					<Nav className = 'ml-auto'>
						<Nav.Item key = 'home'>
							<NavLink exact to = '/' className = 'nav-link'>Home</NavLink>
						</Nav.Item>
						<Nav.Item key = 'account'>
							<NavLink exact to = '/' className = 'nav-link'>Account</NavLink>
						</Nav.Item>
						<Nav.Item key = 'notes'>
							<NavLink exact to = '/' className = 'nav-link'>Notes</NavLink>
						</Nav.Item>
						<Nav.Item key = 'about'>
							<NavLink exact to = '/' className = 'nav-link'>About</NavLink>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}