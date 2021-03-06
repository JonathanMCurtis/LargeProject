import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Subjects from '../data/Subjects.json';
import { connect } from 'react-redux';
import { RegistrationCard } from '../components';
import { createNote, loadNote, editNote, deleteNote } from '../config';
import './styles.css';

class EditNoteCard extends Component {
	constructor (props) {
		super(props);

		this.state = { activeSubject: '', activeTopic: '', action: this.props.action };
	}

	componentDidMount() {
		const { loadNote } = this.props;
		const { action } = this.state;

		if (action === 'load')
			loadNote({ noteID: this.props.router.match.params.id });
	}

	renderSubjectTags () {
		const { activeSubject, action } = this.state;

		return (
			<div className = 'pb-4'>
				{ action !== 'load' && <>
					<h2>Choose a subject</h2>
					<p>Click a subject to see the topics.</p>
				</> || <h2>Subject</h2> }
				{
					Object.keys(Subjects).map(subject => (
						<Button
							disabled = { action === 'load' }
							className = 'ml-1 mb-1'
							style = {{
								backgroundColor: ((activeSubject && subject === activeSubject && '#e7013e') || (activeSubject && 'gray')) || (!activeSubject && Subjects[subject].color),
								border: 'none'
							}}
							key = { subject }
							onClick = { () => this.setState({ activeSubject: subject }) }
						>
							{ subject }
						</Button>
					))
				}
			</div>
		);
	}

	renderTopicTags () {
		const { activeSubject, activeTopic, action } = this.state;

		return (
			Subjects[activeSubject] && <div>
				{ action !== 'load' && <>
					<h3>Choose a topic</h3>
					<p>Tag the note with a topic.</p>
				</> || <h3>Topic</h3> }
				{ Subjects[activeSubject].topics.map(topic =>
					<Button
						disabled = { action !== 'create' }
						className = 'mt-1 ml-1'
						style = {{
							backgroundColor: ((activeTopic && topic === activeTopic && '#1ea896') || (activeTopic && 'gray')) || (!activeTopic && Subjects[activeSubject].color),
							border: 'none'
						}}
						key = { topic }
						onClick = { () => this.setState({ activeTopic: topic }) }>
						{ topic }
					</Button>
				)
				}
			</div>
		);
	}

	async create({ title, content }) {
		const { activeSubject, activeTopic } = this.state;
		const { createNote, userID, loadNote } = this.props;
		
		await createNote({
			title,
			subject: activeSubject,
			topic: activeTopic,
			content,
			userID
		});

		const { currentNote, error } = this.props;

		console.log(error);

		await loadNote({ noteID: currentNote.nodeID });

		this.setState({ active: 'load' });
	}

	async edit({ title, content }) {
		const { activeSubject, activeTopic } = this.state;
		const { userID, loadNote, editNote } = this.props;

		await editNote({
			title,
			subject: activeSubject,
			topic: activeTopic,
			content,
			userID
		});

		const { currentNote } = this.props;

		await loadNote({ noteID: currentNote.nodeID });

		this.setState({ active: 'load' });
	}

	render() {
		const { action } = this.state;
		const { currentNote, userID, loggedIn } = this.props;
		let title;
		let btn1;
		let btn2;

		switch (action) {
			case 'create':
				title = 'Add a new note...';
				btn1 = { title: 'Create Note', onClick: values => this.create(values) };
				btn2 = { title: 'Discard Draft', onClick: () => this.props.history.goBack() };
				break;
			case 'load':
				title = currentNote.title;
				btn1 = { title: 'Edit Note', onClick: () => this.setState({ action: 'edit' }) };
				break;
			case 'edit':
				title = currentNote.title;
				btn1 = { title: 'Update Note', onClick: values => this.edit(values) };
				btn2 = { title: 'Discard Changes', onClick: () => this.setState({ action: 'load' }) };
				break;
		}

		return (
			<div className = 'page pattern-vertical-lines-xl bg-white text-primary'>
				<NavBar />
				<Container>
					<div className = 'text-dark'>
						<Row className = 'pt-4'>
							<Col sm = { 8 }>
								<h1 className = 'display-4'>{ title }</h1>
								<Form.Group controlId = 'title'>
								{ action === 'load' && <Form.Control value = { currentNote.title } readOnly/> 
								|| <Form.Control readOnly = { !loggedIn } ref = { ref => this.title = ref } placeholder = 'Note title' /> }
								</Form.Group>
								{ action !== 'load' && <Form.Group controlId = 'note-form-textarea'>
									<Form.Control ref = { ref => this.content = ref } readOnly = { action === 'load' || !loggedIn } as = 'textarea' rows = '10' placeholder = 'Start writing here!' />
									</Form.Group>
								|| <div className = 'bg-light'><p>{ currentNote.content }</p></div> }
								<div className = 'my-2'>
									<Button disabled = { !loggedIn || (action === 'load' && userID !== currentNote.userID) } variant = 'success' className = 'mr-2' onClick = { () => btn1.onClick({ title: this.title.value, content: this.content.value }) }>{ btn1.title }</Button>
									{ btn2 && <Button disabled = { !loggedIn || (action === 'load' && userID !== currentNote.userID) } variant = 'danger' onClick = { () => btn2.onClick() }>{ btn2.title }</Button> }
								</div>
							</Col>
							<Col className = 'bg-light p-3 rounded' sm = { 4 }>
								{ this.renderSubjectTags() }
								{ this.renderTopicTags() }
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		);
	}
}

const mapDispatchToProps = { createNote, loadNote, editNote, deleteNote };
const mapStateToProps = ({ user: { loggedIn, userID }, note: { currentNote, error } }) => ({ loggedIn, userID, currentNote, error });

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteCard);