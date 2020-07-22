
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
import Subject from '../data/Subjects.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImage from '../data/img/books1.jpg';
import { Actions } from 'react-native-router-flux';
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
				{ Object.keys(Subject).map(subject => (
					<TouchableOpacity
						key = { subject }
						onPress = { () => Actions.push('topics', { subject, topics: Subject[subject].topics }) }
						style = { [styles.btn, { backgroundColor: Subject[subject].color }] }
					>
						<Text style = { styles.text }>{ subject + ' ' }
							<Icon name = { Subject[subject].icon } size = { 26 } color = { 'black' } />
						</Text>
					</TouchableOpacity>
				)) }
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
		paddingBottom: '-5%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1
	},
	buttonStyle: {
		height: 30,
		marginBottom: 8,
		justifyContent: 'center'
	},
	btn: {
		width: WIDTH - 200,
		height: '6%',
		borderRadius: 25,
		backgroundColor: '#f59ff5',
		justifyContent: 'center',
		marginTop: '5%'
	},
	text: {
		color: 'black',
		fontSize: 16,
		textAlign: 'center'

	}

});