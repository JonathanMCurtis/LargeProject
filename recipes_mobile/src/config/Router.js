import React from 'react';
import { Dimensions } from 'react-native';
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import { Login, Signup, Profile, Subjects } from '../screens';

const { height, width } = Dimensions.get('screen');

export default () => (
	<Router>
		<Stack
			tabs
			key = 'root'
			activeTintColor = '#FEE4B0'
			inactiveTintColor = '#F5717D'
			tabBarStyle = {{ backgroundColor: '#9A031E', height: height * 0.06 }}
			labelStyle = {{ fontWeight: 'bold', fontSize: 14, paddingBottom: 10 }}
		>
			<Scene key = 'login' component = { Login } title = 'Login' hideNavBar />
			<Scene key = 'signup' component = { Signup } title = 'Sign Up' hideNavBar />
			<Scene key = 'profile' component = { Profile } title = 'Profile' hideNavBar />
			<Scene key = 'subjects' component = { Subjects } title = 'Subjects' hideNavBar />
		</Stack>
	</Router>
);