import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { NavBar } from '../components';
import { FaUsers } from 'react-icons/fa';
import './styles.css';

class App extends Component {
	render() {
		return (
			<>
				<NavBar />
				<Container>
					<h2 className = 'display-4 text-primary pb-3'><u>About Us</u></h2>
					<h3 className = 'pb-4'>Welcome to <span className = 'text-primary'>Study Share</span>! We're going above and beyond normal notes!</h3>

					<h4 className = 'text-secondary'>About Study Share</h4>
					<p>Study Share a free note sharing website developed by the members of Group 21.
				We created this for college students by college students.
				We allow students to easily share their notes in no time at all! </p>
					<h4 className = 'text-secondary'>Our Goal</h4>
					<p>
				Our goal for developing Study Share was to allow students an easier way to exchange notes.
				We know that sometimes you just don't get the topic and need more help.
				Notes can provide additional assistance to anyone struggling and allows other perspectives of a lesson
				to be shown.
					</p>
					<h4 className = 'text-secondary'>How to sign up</h4>
					<p>
				Signing up for Study Share is very simple. Only a first name, username, password, and email is required.
					</p>
					<p>This website was developed using React and React Native;
					and can be viewed through desktop or mobile.</p>
					<hr />
					<h3 className = 'text-success'>Our Team <FaUsers /></h3>
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
						<Col>Idel Martinez Ramos</Col>
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
			</>
		);
	}
}

export default App;