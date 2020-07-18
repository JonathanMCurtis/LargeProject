import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FaUsers } from 'react-icons/fa';
import './styles.css';

class App extends Component {
	render() {
		return (
			<Container expand>
				<h2>About Us</h2>
				<h3>Welcome to Study Share! We're going above and beyond normal notes!</h3>
				<h3>About Study Share</h3>
				<p className = "about">Study Share a free note sharing website developed by the members of Group 21.
				We created this for college students by college students.
				We allow students to easily share their notes in no time at all! </p>
				<h3>Our Goal</h3>
				<p className = "about">
				Our goal for developing Study Share was to allow students an easier way to exchange notes.
				We know that sometimes you just don't get the topic and need more help.
				Notes can provide additional assistance to anyone struggling and allows other perspectives of a lesson
				to be shown.
				</p>
				<h3>How to sign up</h3>
				<p className = "about">
				Signing up for Study Share is very simple. Only a First name, Last Name, and email is required.
				A username and password will be created for account login.
				</p>
				<p>This website was developed using React and React Native;
					and can be viewed through desktop or mobile.</p>
				<hr />
				<h3>Our Team <FaUsers /></h3>
				<Row>
					<Col>Jonathon Chen Bell</Col>
					<Col>Front-End Mobile</Col>
				</Row>
				<Row>
					<Col>Jonathon Michael Curtis</Col>
					<Col>API</Col>
				</Row>
				<Row>
					<Col>Dannah Belle Dolorfino</Col>
					<Col>Front-End Desktop</Col>
				</Row>
				<Row>
					<Col>Liderma Guerry</Col>
					<Col>Database and Front-End Mobile</Col>
				</Row>
				<Row>
					<Col>Idel Alfonso Martinez Ramos</Col>
					<Col>Front-End Desktop and Mobile</Col>
				</Row>
				<Row>
					<Col>Alexander Joseph Varga</Col>
					<Col>Front-End Mobile</Col>
				</Row>
				<Row>
					<Col>Mehrob Farhangmehr</Col>
					<Col>Database and Front-End Desktop</Col>
				</Row>
			</Container>
		);
	}
}

export default App;