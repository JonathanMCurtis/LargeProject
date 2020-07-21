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

import bgImage from './app/img/old-library.jpg'; // image for background
import logo from './app/img/favicon.png';
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
					<Image source = { logo } style = { styles.logo } />

					<Text style = { styles.logoText }>Sign Up</Text>
				</View>

				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'First Name' }
						placeholderTextColor = { '#e4b1ab' }
						underlineColorAndroid = 'transparent'
					/>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Last Name' }
						placeholderTextColor = { '#e4b1ab' }
						underlineColorAndroid = 'transparent'
					/>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Username' }
						placeholderTextColor = { '#e4b1ab' }
						underlineColorAndroid = 'transparent'
					/>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Email' }
						placeholderTextColor = { '#e4b1ab' }
						underlineColorAndroid = 'transparent'
					/>
				</View>
				<View style = { styles.inputContainer }>
					<TextInput
						style = { styles.input }
						placeholder = { 'Password' }
						secureTextEntry = { this.state.showPass }
						placeholderTextColor = { '#e4b1ab' }
						underlineColorAndroid = 'transparent'
					/>
					<TouchableOpacity style = { styles.btnEye } onPress = { () => this.showPass() }>
						<Icon name = { this.state.press == false ? 'eye' : 'eye-off' } size = { 26 } color = { 'rgba(255, 255, 255, 0.7)' } />
					</TouchableOpacity>
				</View>
				{ this.renderLinks('Create Account') }

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
		marginBottom: '10%'
	},
	logoText: {
		color: '#fb4d3d',
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
		color: '#e4b1ab',
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
		backgroundColor: '#fb4d3d',
		justifyContent: 'center',
		marginTop: '5%'
	},
	text: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'

	}
});