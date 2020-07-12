
import React, { Component } from 'react';
import {
	ImageBackground,
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import bgImage from './app/img/old-library.jpg'; // image for background
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // imports icons from vector package

const { width: WIDTH } = Dimensions.get('window');

export default class Example extends Component {
	constructor() { // toggles password hidden or visible on click
		super();
		this.state = { showPass: true, press: false };
	}

	showPass() {
		if (!this.state.press)
			this.setState({ showPass: false, press: true });
		else
			this.setState({ showPass: true, press: false });
	}

	// Example

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
					<Text style = { styles.logoText }>Welcome to Study Share!</Text>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Username' }
						placeholderTextColor = { 'rgba(255, 255, 255, 0.7)' }
						underlineColorAndroid = 'transparent'
					/>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Password' }
						secureTextEntry = { this.state.showPass }
						placeholderTextColor = { 'rgba(255, 255, 255, 0.7)' }
						underlineColorAndroid = 'transparent'
					/>
					<TouchableOpacity style = { styles.btnEye } onPress = { () => this.showPass() }>
						<Icon name = { this.state.press == false ? 'eye' : 'eye-off' } size = { 26 } color = { 'rgba(255, 255, 255, 0.7)' } />
					</TouchableOpacity>
				</View>
				{ this.renderLinks('Login') }
				{ this.renderLinks('Sign Up') }

				<TouchableOpacity style = { styles.btnforgotPass }>
					<Text style = { styles.text }> Forgot Password </Text>
				</TouchableOpacity>

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
	logoContainer: {
		alignItems: 'center',
		marginBottom: '20%'
	},
	logoText: {
		color: 'white',
		fontSize: 30,
		fontWeight: '500',
		marginTop: '5%'
	},
	inputContainer: {
		marginTop: '4%'
	},
	input: {
		width: WIDTH - 55,
		height: '-20%',
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: '10%',
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		color: 'rgba(255, 255, 255, 0.7)',
		marginHorizontal: '5%'
	},
	btnEye: {
		position: 'absolute',
		bottom: 8,
		right: 37
	},
	btnLogin: {
		width: WIDTH - 200,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#0275d8',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnSignup: {
		width: WIDTH - 200,
		height: '10%',
		borderRadius: 25,
		backgroundColor: '#0275d8',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnforgotPass: {
		height: '5%',
		justifyContent: 'center',
		marginTop: '5%'
	},
	text: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 16,
		textAlign: 'center'

	}
});