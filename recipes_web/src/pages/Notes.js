import React, { Component } from 'react';
import { NavBar } from '../components';
import { connect } from 'react-redux';
import { getNotes, search } from '../config';
import { Container, Badge } from 'react-bootstrap';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './styles.css';

const NoteCard = ({ favorites, noteID, author, title, submissionDate, favoriteCount }) => {
	return (
		<button className = 'text-left note-card m-4 bg-light'>
			<h5 className = 'text-dark'>
				{ title }
			</h5>
			<div>
				<p className = 'text-secondary'>Author: <span className = 'text-dark'>{ author }</span></p>
				<p className = 'text-secondary'>Made on: <span className = 'text-dark'>{ submissionDate }</span></p>
				<div className = 'float-right mt-n4'>
					<FaRegBookmark className = 'text-primary' />
					<Badge variant = 'primary'>{ favoriteCount }</Badge>
				</div>
			</div>
		</button>
	);
};

class Notes extends Component {
	componentDidMount() {
		const { getNotes, search, query, action, userID, loggedIn } = this.props;

		if (action && action !== 'search') {
			loggedIn && getNotes({ userID }, action);
		}
		else if (action === 'search') {
			search({ search: query });
		}
		else {
			const { router: { match: { params: { subject, topic } } } } = this.props;

			getNotes({ subject: subject.split('-').join(' '), topic: topic.split('-').join(' ') });
		}
	}

	render () {
		const { notes, query, action, favorites } = this.props;
		let title;

		switch (action) {
			case 'search':
				title = query;
				break;
			case 'favorites':
				title = 'Saved notes';
				break;
			case 'submitted':
				title = 'My notes';
				break;
			default:
				title = this.props.router.match.params.topic.split('-').join(' ');
		}

		const notesArr = [
			{ title: 'Integrals', author: 'Alice', submissionDate: '7/22/2020', favoriteCount: 10 },
			{ title: 'Limits', author: 'Bob', submissionDate: '7/20/2020', favoriteCount: 7 },
			{ title: 'Other Calculus things', author: 'Cole', submissionDate: '7/20/2020', favoriteCount: 21 },
			{ title: 'Integrals', author: 'Alice', submissionDate: '7/22/2020', favoriteCount: 10 },
			{ title: 'Limits', author: 'Bob', submissionDate: '7/20/2020', favoriteCount: 7 },
			{ title: 'Other Calculus things', author: 'Cole', submissionDate: '7/20/2020', favoriteCount: 21 },
			{ title: 'Integrals', author: 'Alice', submissionDate: '7/22/2020', favoriteCount: 10 },
			{ title: 'Limits', author: 'Bob', submissionDate: '7/20/2020', favoriteCount: 7 },
			{ title: 'Other Calculus things', author: 'Cole', submissionDate: '7/20/2020', favoriteCount: 21 },
			{ title: 'Even more Calculus things', author: 'Danny', submissionDate: '7/20/2020', favoriteCount: 21 }
		];

		return (
			<>
				<NavBar />
				<div className = 'page pattern-grid-xl bg-navy text-primary'>
					<Container className = 'h-100 justify-content-md-center'>
						<h1 className = 'display-3 text-secondary text-center'>{ title }</h1>
						<div className = 'text-center'>
							{ notesArr.map(note => NoteCard({ favorites, ...note })) }
						</div>
					</Container>
				</div>
			</>
		);
	}
}

const mapDispatchToProps = { getNotes, search };
const mapStateToProps = ({ user: { loggedIn, userID, favorites }, note: { notes, query } }) => {
	return (
		{ loggedIn, userID, query, notes, favorites }
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);