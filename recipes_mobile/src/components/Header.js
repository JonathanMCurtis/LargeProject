import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
	return (
		<View style = { styles.header }>
			<Text style = { styles.text }>{ title }</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: 70,
		padding: 15,
		backgroundColor: '#0275d8'
	},
	text: {
		color: 'white',
		fontSize: 23,
		textAlign: 'center'
	}
});

export default Header;