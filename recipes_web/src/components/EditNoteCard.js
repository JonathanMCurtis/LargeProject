import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Row, Col, Form, Button, Badge } from 'react-bootstrap';
import Subjects from '../data/Subjects.json';
import './styles.css';

export default class EditNoteCard extends Component {
	constructor (props) {
		super(props);

		this.state = { active: '' };
	}

	// Same idea implemented from Subjects.js
	renderSubjectTags () {
		return (
			<div>
				<h2>Add choose a subject</h2>
				<p>Click a subject to see the topics.</p>
				{
					Object.keys(Subjects).map(subject => (
						<Button
							className = 'ml-1 mb-1'
							style = {{
								backgroundColor: Subjects[subject].color,
								border: 'none'
							}}
							key = { subject }
							onClick = { () => this.setState({ active: subject }) }
						>{ subject }
						</Button>
					))
				}
			</div>
		);
	}

	renderTopicTags () {
		const { active } = this.state;

		if (Subjects[active] != null) {
			// Just render out the topics as plain text
			return (
				<div>
					<h3>Add choose a topic</h3>
					<p>Tag the note with a topic.</p>
					{ Subjects[active].topics.map(topic =>
						<Button
							className = 'mt-1 ml-1'
							style = {{
								backgroundColor: Subjects[active].color,
								border: 'none'
							}}
							key = { topic }
							onClick = ''>
							{ topic }
						</Button>
					)
					}
				</div>
			);
		}
	}

	render() {
		const { title, btn1, btn2 } = this.props;

		return (
			<div>
				<NavBar />
				<Row>
					<Col sm = { 8 }>
						<h1>{ title }</h1>

						<Form.Group controlId = 'note-form-textarea'>
							<Form.Control as = 'textarea' rows = '10' />
						</Form.Group>

						<h3>Tags</h3>
						<div
							id = 'tag-space'
							className = 'mt-2'
							style = {{
								backgroundColor: 'whitesmoke',
								borderRadius: '10px',
								height: '5em',
							}}
						>
							<Button variant = 'primary'>
								Biology <span className = 'mt-1 badge badge-light'>&#215;</span>
							</Button>
						</div>

						<Button variant = 'success'>{ btn1 }</Button>
						<Button variant = 'danger'>{ btn2 }</Button>
					</Col>
					<Col sm = { 4 }>
						{ this.renderSubjectTags() }
						{ this.renderTopicTags() }
					</Col>
				</Row>
			</div>
		);
	}
}