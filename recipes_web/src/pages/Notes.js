import React, { Component } from 'react';
import { NavBar } from '../components';
import { connect } from 'react-redux';
import { getNotes } from '../config';
import { Container, Badge } from 'react-bootstrap';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './styles.css';

const NoteCard = ({ noteID, author, title, submissionDate, favoriteCount }) => {
	return (
		<button className = 'noteCard m-4 bg-light'>
			<h5 className = 'text-dark'>
				{ title }
			</h5>
			<div>
				<p className = 'text-secondary'>Author: <span className = 'text-dark'>{ author }</span></p>
				<p className = 'text-secondary'>Made on: <span className = 'text-dark'>{ submissionDate }</span></p>
				<div className = 'float-right'>
					<FaRegBookmark className = 'text-primary' />
					<Badge variant = 'primary'>{ favoriteCount }</Badge>
				</div>
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
		const { getNotes, router: { match: { params: { subject, topic } } } } = this.props;

		const notesArr = [
			{ title: 'Integrals', author: 'Alice', submissionDate: '7/22/2020', favoriteCount: 10 },
			{ title: 'Limits', author: 'Bob', submissionDate: '7/20/2020', favoriteCount: 7 },
			{ title: 'Other Calculus things', author: 'Cole', submissionDate: '7/20/2020', favoriteCount: 21 },
			{ title: 'Even more Calculus things', author: 'Danny', submissionDate: '7/20/2020', favoriteCount: 21 }
		];

		return (
			<div className = 'page pattern-grid-xl bg-navy text-primary'>
				<NavBar />
				<Container className = 'h-100 justify-content-md-center'>
					<div className = 'notes-container'>
						<h1 className = 'display-1 text-secondary text-center'>{ topic }</h1>
						{ notesArr.map(note => {
							return (
								NoteCard(note)
							);
						}) }
					</div>
				</Container>
			</div>
		);
	}
}

const mapDispatchToProps = { getNotes };
const mapStateToProps = ({ note, note: { notes } }) => ({ notes });

export default connect(mapStateToProps, mapDispatchToProps)(Notes);