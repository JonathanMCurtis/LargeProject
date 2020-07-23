import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../data/images/favicon.png';
import { connect } from 'react-redux';
import { logoutUser } from '../config';

class NavBar extends Component {
	render () {
		const { background, loggedIn, logoutUser } = this.props;

		return (
			<Navbar
				className = { (!background && 'bg-dark') || '' }
				style = {{ 'backgroundColor': background }}
				variant = 'dark' sticky = 'top'
			>
				<Container>
					<Navbar.Brand>
						<img
							src = { Logo }
							width = '30'
							height = '30'
							className = 'mr-2'
						/>
						<Link className = 'text-light' to = '/'>Study Share</Link>
					</Navbar.Brand>
					<Nav className = 'ml-auto'>
						<Nav.Item key = 'home'>
							<NavLink exact to = '/notes' className = 'nav-link'>Home</NavLink>
						</Nav.Item>
						<Nav.Item key = 'account'>
							<NavLink exact to = '/profile' className = 'nav-link'>Account</NavLink>
						</Nav.Item>
						<NavDropdown title = 'Notes'>
							<NavDropdown.Item>
								<Link to = '/notes/new-note'>Create note</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to = '/notes/submitted'>My notes</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to = '/notes/saved'>Saved notes</Link>
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Item key = 'about'>
							<NavLink exact to = '/about' className = 'nav-link'>About</NavLink>
						</Nav.Item>
						{ loggedIn && <Nav.Item key = 'log-out'>
							<NavLink to = '/' className = 'nav-link' onClick = { () => logoutUser() }>Log out</NavLink>
						</Nav.Item> }
					</Nav>
				</Container>
			</Navbar>
		);
	}
}

const mapDispatchToProps = { logoutUser };
const mapStateToProps = ({ user: { loggedIn }}) => ({ loggedIn });

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);