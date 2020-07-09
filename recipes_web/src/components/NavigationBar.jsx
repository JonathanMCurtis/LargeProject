import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';

// Navigation bar for index page
class NavigationBar extends Component {
	render () {
		return (
			<NavBar bg = "dark" variant = "dark" fixed = "top">
				<NavBar.Brand href = "#home">Study Share</NavBar.Brand>
				<Nav className = "ml-auto">
					<Nav.Link href = "#home">Home</Nav.Link>
					<Nav.Link href = "#about">About Us</Nav.Link>
					<Nav.Link href = "#contact">Contact Us</Nav.Link>
				</Nav>
			</NavBar>
		);
	}
}

export default NavigationBar;