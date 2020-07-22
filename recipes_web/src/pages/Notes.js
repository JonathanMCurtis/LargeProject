import React, { Component } from 'react';
import { NavBar } from '../components';
import { connect } from 'react-redux';
import { getNotes } from '../config';
import Container from 'react-bootstrap/Container';
import './styles.css';

const NoteCard = ({ noteID, title, submissionDate, favoriteCount }) => {
	return (
		<button className = 'noteCard'>
			<h5>
				{ title }
			</h5>
			<div>
				{ submissionDate }
			</div>
		</button>
	);
};

class Notes extends Component {
	componentDidMount() {
		const { getNotes, router: { match: { params: { subject, topic } } } } = this.props;

		getNotes({ subject: subject.split('-').join(' '), topic: topic.split('-').join(' ') });
	}

	render () {
		const { notes } = this.props;

		const notesArr = [
			{ title: 'Integrals', submissionDate: '7/22/2020', favoriteCount: 10 }
		];

		return (
			<div className = 'bg-primary'>
				<NavBar />
				<Container>
					{ notesArr.map(note => {
						return (
							NoteCard(note)
						);
					}) }
				</Container>
			</div>
		);
	}
}

const mapDispatchToProps = { getNotes };
const mapStateToProps = ({ note, note: { notes } }) => ({ notes });

export default connect(mapStateToProps, mapDispatchToProps)(Notes);