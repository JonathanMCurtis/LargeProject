import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaBookmark } from 'react-icons/fa';
import './styles.css';

class App extends Component {
	render() {
		let favoritedNotes = [
			{ title: 'First note', submitted: 'Feb 10', author: 'Bob Bobbington', subject: 'Integrals' }
		];

		let submittedNotes = [
			{ title: 'My First Note', submitted: 'March 2', favorites: '6', subject: 'Page Tables' }
		];

		let profile =
			{ firstName: 'Justin', lastName: 'Time', email: 'SpaceOverTime@gmail.com' }
		;

		return (
			<Container expand className = "profile-color">
				<Row>
					<Col xs = { 3 }>
						<h2>Account</h2>
					</Col>
					<Col>
						<h2><FaCog /> Settings!</h2>
					</Col>
				</Row>
				<h3>Profile</h3>
				<h4>Name: { profile.firstName }  { profile.lastName } </h4>
				<h4>Email: { profile.email }</h4>
				<h4>Submitted Notes:</h4>
				<Card style = {{ width: '18rem' }} border = "secondary" text = "primary">
					<Card.Body>
						<Card.Title> { submittedNotes[0].title } </Card.Title>
						<Card.Subtitle>
							Submitted on { submittedNotes[0].submitted }
						</Card.Subtitle>
						<Card.Text>
						Subject: { submittedNotes[0].subject }
						</Card.Text>
						<container class = "d-flex justify-content-end">
							<FaBookmark /> { submittedNotes[0].favorites }
						</container>
					</Card.Body>
				</Card>
				<h4>Favorited Notes:</h4>
				<Card style = {{ width: '18rem' }} border = "primary" text = "primary">
					<Card.Body>
						<Card.Title> { favoritedNotes[0].title } </Card.Title>
						<Card.Subtitle>
							Submitted on { favoritedNotes[0].submitted } by { favoritedNotes[0].author }
						</Card.Subtitle>
						<Card.Text>
						Subject: { favoritedNotes[0].subject }
						</Card.Text>
						<container class = "d-flex justify-content-end">
							<FaBookmark />
						</container>
					</Card.Body>
				</Card>
				<Row>
					<Button variant = "primary">
						Reset Password
					</Button>
				</Row>
			</Container>
		);
	}
}

export default App;