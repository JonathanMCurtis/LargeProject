import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ImageBackground
} from 'react-native';
import Subject from '../data/Subjects.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImage from '../data/img/books1.jpg';
import { Actions } from 'react-native-router-flux';
const { width: WIDTH } = Dimensions.get('window');

export class Topics extends Component {
	constructor() {
		super();
		this.state = { showPass: true, press: false };
	}

	showPass() {
		if (!this.state.press)
			this.setState({ showPass: false, press: true });
		else
			this.setState({ showPass: true, press: false });
	}
	render() {
		const { subject, topics } = this.props;
		const { active } = this.state;

		return (
			<ImageBackground source = { bgImage } style = { styles.backgroundContainer }>
			 <View style = { styles.logoText }>
			 <Text style = { styles.headerText }>Topics</Text>
			 </View>

				<Text>
					Welcome, you are at { topics }.
				</Text>
				<View style = { styles.logoText }>
					{ Object.keys(Topics).map(topics => (
						<TouchableOpacity

							style = { [styles.btn,
								{ backgroundColor: Subject[subject].color }] }
						>

						</TouchableOpacity>
					)) }
				</View>
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