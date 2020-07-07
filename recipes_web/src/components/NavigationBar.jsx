import React from "react";
import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";

// Navigation bar for index page
class NavigationBar extends Component {
    render () {
        return (
            <NavBar bg="dark" variant="dark">
            <NavBar.Brand href="#home">Recipe Project</NavBar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#contact">Contact Us</Nav.Link>
            </Nav>
        </NavBar>
        );
    }
}

export default NavigationBar;