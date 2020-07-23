import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar';
import Subjects from '../data/Subjects.json';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchForm } from '../components';
import {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb,
	AiOutlineSearch
} from 'react-icons/ai';

const Icons = {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb,
	AiOutlineSearch
};

class Subject extends Component {
	constructor(props) {
		super(props);

		this.state = { active: '' };
	}

	renderSubjects() {
		const Icon = name => {
			let Icon = Icons[name];

			return <Icon size = { 30 } />;
		};

		return (
			<Row sm = { 3 } xs = { 3 } lg = { 3 } className = 'justify-content-center'>
				{ Object.keys(Subjects).map(subject => (
					<Button
						className = 'border-0 m-2 text-dark font-weight-bold'
						style = {{ backgroundColor: Subjects[subject].color, maxWidth: '14em', minHeight: '4em' }}
						key = { subject }
						onClick = { () => this.setState({ active: subject }) }
					>
						<Row className = 'align-items-center'>
							<Col>
								{ subject }
							</Col>
							<Col>
								{ Icon(Subjects[subject].icon) }
							</Col>
						</Row>
					</Button>
				))
				}
			</Row>
		);
	}

	renderTopics() {
		const { active } = this.state;

		return (
			<Row sm = { 4 } className = 'justify-content-center align-items-center'>
				{ Subjects[active] && Subjects[active].topics.map(topic => {
					let subjectLink = active.split(' ').join('-');
					let topicLink = topic.split(' ').join('-');

					return (
						<Link
							className = 'btn m-2 text-black font-weight-bold'
							style = {{ borderColor: Subjects[active].color, borderWidth: '2px' }}
							to = { `/notes/${subjectLink}/${topicLink}` }
						>
							{ topic }
						</Link>
					);
				}) }
			</Row>
		);
	}

	render () {
		return (
			<>
				<NavBar />
				<Container>
					<SearchForm />
					<h4 className = 'text-left'>Or find specific notes with subjects!</h4>
					{ this.renderSubjects() }
					{ this.renderTopics() }
				</Container>
			</>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Subject);