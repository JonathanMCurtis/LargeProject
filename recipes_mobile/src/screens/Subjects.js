
import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImage from '../data/img/books1.jpg';
const { width: WIDTH } = Dimensions.get('window');

export class Subjects extends Component {
	render() {
		const {
			containerStyle,
			searchTextStyle,
			buttonStyle
		} = styles;

		return (
			<ImageBackground source = { bgImage } style = { styles.backgroundContainer }>
			 <Text style = { styles.headerText }>Subjects</Text>
				<View style = { styles.container }>

					<View style = { containerStyle }>
						<TextInput
							style = { searchTextStyle }
						 />

						<Button
							buttonStyle = { buttonStyle }

							title = { 'Search' }
						/>

					</View>
					<View><Text style = { styles.logoText }>...Or look up notes from these subjects:</Text>
					</View>

				</View>
				<TouchableOpacity style = { styles.btnMath }>

					<Text style = { styles.text }> Math
						<Icon name = { 'calculator-variant' } size = { 26 } color = { 'black' } />
					</Text>

				</TouchableOpacity>

				<TouchableOpacity style = { styles.btnScience }>
					<Text style = { styles.text }> Science
						<Icon name = { 'flask-outline' } size = { 26 } color = { 'black' } />
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style = { styles.btnArts }>
					<Text style = { styles.text }> Arts and Humanities
						<Icon name = { 'script-outline' } size = { 26 } color = { 'black' } />
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style = { styles.btnSocialSciences }>
					<Text style = { styles.text }> Social Sciences
						<Icon name = { 'human-greeting' } size = { 26 } color = { 'black' } />
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style = { styles.btnTechnology }>

					<Text style = { styles.text }> Technology
						<Icon name = { 'laptop-windows' } size = { 26 } color = { 'black' } />
					</Text>

				</TouchableOpacity>

				<TouchableOpacity style = { styles.btnOther }>
					<Text style = { styles.text }> Other
						<Icon name = { 'lightbulb-multiple-outline' } size = { 26 } color = { 'black' } />
					</Text>
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

	containerStyle: {
		flexDirection: 'row',
		marginTop: 75,
		marginLeft: 10,
		marginRight: 10
	},
	headerText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30
	},
	logoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
		paddingTop: '5%'
	},

	searchTextStyle: {
		flex: 1,
		paddingBottom: '-5%'

	},
	buttonStyle: {
		height: 30,
		marginBottom: 8,
		justifyContent: 'center'
	},
	btnMath: {
		width: WIDTH - 250,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#f59ff5',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnScience: {
		width: WIDTH - 250,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#6ced70',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnArts: {
		width: WIDTH - 150,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#63bcf3',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnSocialSciences: {
		width: WIDTH - 200,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#edf19b',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnTechnology: {
		width: WIDTH - 200,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#77eed3',
		justifyContent: 'center',
		marginTop: '5%'
	},
	btnOther: {
		width: WIDTH - 200,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#e6ab1a',
		justifyContent: 'center',
		marginTop: '5%'
	},
	text: {
		color: 'black',
		fontSize: 16,
		textAlign: 'center'

	}

});