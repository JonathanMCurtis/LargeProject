import React, { Component } from 'react';
import {
	ImageBackground,
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Image
} from 'react-native';

import bgImage from '../data/img/old-library.jpg'; // image for background
import logo from '../data/img/favicon.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // imports icons from vector package

const { width: WIDTH } = Dimensions.get('window');

export class Login extends Component {
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
					<Image source = { logo } style = { styles.logo } />

					<Text style = { styles.logoText }>Welcome to Study Share!</Text>
					<Text style = { styles.subLogo }>A place to find, share, and study notes with others!
					</Text>
				</View>

				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Username' }
						placeholderTextColor = { '#fee4b0' }
						underlineColorAndroid = 'transparent'
					/>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Password' }
						secureTextEntry = { this.state.showPass }
						placeholderTextColor = { '#fee4b0' }
						underlineColorAndroid = 'transparent'
					/>
					<TouchableOpacity style = { styles.btnEye } onPress = { () => this.showPass() }>
						<Icon name = { this.state.press == false ? 'eye' : 'eye-off' } size = { 26 } color = { '#fee4b0' } />
					</TouchableOpacity>
				</View>
				{ this.renderLinks('Login') }
				{ this.renderLinks('Sign Up') }

				<TouchableOpacity style = { styles.btnforgotPass }>
					<Text style = { styles.forgot }> Forgot Password </Text>
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
	logo: {
		width: 100,
		height: 100
	},
	logoContainer: {
		alignItems: 'center'
	},
	logoText: {
		color: '#fabc3c',
		fontSize: 30,
		fontWeight: '500',
		paddingBottom: '10%'
	},
	subLogo: {
		color: '#fee4b0',
		fontSize: 16,
		fontWeight: '500',
		paddingBottom: '15%'
	},
	inputContainer: {
		marginTop: '4%'
	},
	input: {
		width: WIDTH - 55,
		height: '-10%',
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: '10%',
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		color: '#fee4b0',
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
		backgroundColor: '#fee4b0',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnSignup: {
		width: WIDTH - 200,
		height: '10%',
		borderRadius: 25,
		backgroundColor: '#fee4b0',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnforgotPass: {
		width: WIDTH - 250,
		height: '6%',
		borderRadius: 25,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'center'
	},
	forgot: {
		color: '#fee4b0',
		fontSize: 16,
		textAlign: 'center'
	},
	text: {
		color: '#9a031e',
		fontSize: 16,
		textAlign: 'center'
	}
});