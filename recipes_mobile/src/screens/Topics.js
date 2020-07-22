import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Subject from '../data/Subjects.json';

export class Topics extends Component {
	render() {
		const { subject, topics } = this.props;

		return (
			<View>
				<Text>
					Welcome, you are at { topics } under { subject }.
				</Text>
			</View>
		);
	}
}