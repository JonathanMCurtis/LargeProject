import React, { Component } from 'react';
import EditNoteCard from '../components/EditNoteCard';

export default class Note extends Component {
	render () {
		if (this.props.render === 'create') {
			return (
				<EditNoteCard title = 'Add a new note...' btn1 = 'Create Note' btn2 = 'Discard Draft' />
			);
		}
		else {
			return (
				<EditNoteCard title = 'Edit this note...' btn1 = 'Save Changes' btn2 = 'Discard Changes'>
				</EditNoteCard>
			);
		}
	}
}