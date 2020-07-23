import React, { Component } from 'react';
import EditNoteCard from '../components/EditNoteCard';

export default class Note extends Component {
	constructor(props) {
		super(props);

		this.state = { action: this.props.action };
	}
	render () {
		const { action } = this.state;

		if (action === 'create') {
			return (
				<EditNoteCard action = { action } title = 'Add a new note...' btn1 = 'Create Note' btn2 = 'Discard Draft' />
			);
		}
		else { // View or Edit if owner
			return (
				<EditNoteCard />
			);
		}
	}
}