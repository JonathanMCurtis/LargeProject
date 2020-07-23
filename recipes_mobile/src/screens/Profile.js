import React, { Component } from 'react';
import {
	ImageBackground,
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Image
} from 'react-native';

import bgImage from '../data/img/books.jpg'; // image for background
import logo from '../data/img/favicon.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // imports icons from vector package

const { width: WIDTH } = Dimensions.get('window');

export class Profile extends Component {
	renderLinks(text) {
		return (

			<TouchableOpacity style = { styles.btnLogin }>

				<Text style = { styles.text }>{ text }</Text>

			</TouchableOpacity>

		);
	}
	render() {
		return (
			<ImageBackground source = { bgImage } style = { styles.backgroundContainer }>
				<View style = { styles.logoContainer }>
					<Image source = { logo } style = { styles.logo } />

					<Text style = { styles.logoText }>Profile</Text>
				</View>

				<View style = { styles.field } >
					<Text style = { styles.profileText }>
						<Icon name = { 'view-dashboard-outline' } size = { 26 } color = { '#f5717d' } />
						First Name: </Text>

					<Text style = { styles.profileText }>
						<Icon name = { 'view-dashboard' } size = { 26 } color = { '#f5717d' } />
						Last Name: </Text>

					<Text style = { styles.profileText }>
						<Icon name = { 'emoticon-excited-outline' } size = { 26 } color = { '#f5717d' } />Username: </Text>

					<Text style = { styles.profileText }>
						<Icon name = { 'email' } size = { 26 } color = { '#f5717d' } />Email: </Text>
				</View>

				{ this.renderLinks('Favorites') }
				{ this.renderLinks('Submitted') }
				{ this.renderLinks('Change Password') }

			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 100,
		height: 100
	},
	logoContainer: {
		alignItems: 'center',
		marginTop: '-40%'
	},
	logoText: {
		color: '#fabc3c',
		fontSize: 30,
		fontWeight: '500',
		marginTop: '5%'
	},
	myCard: {
		textAlign: 'left',
		fontSize: 18
	},
	inputContainer: {
		marginTop: '10%'
	},
	field: {
		width: WIDTH - 55,
		height: '-20%',
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: '10%',
		backgroundColor: 'rgba(154, 3, 30, 0.35)',
		marginHorizontal: '5%'
	},
	btnLogin: {
		width: WIDTH - 200,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#fee4b0',
		justifyContent: 'center',
		marginTop: '5%'
	},
	text: {
		color: '#9a031e',
		fontSize: 16,
		textAlign: 'center'
	},
	profileText: {
		color: '#fee4b0',
		fontSize: 16,
		textAlign: 'left',
		marginTop: '10%'
	}
});