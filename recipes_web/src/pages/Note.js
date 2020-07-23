import React, { Component } from 'react';
import EditNoteCard from '../components/EditNoteCard';

export default class Note extends Component {
	render () {
			return (
				<EditNoteCard action = { this.props.action } />
			);
	}
}