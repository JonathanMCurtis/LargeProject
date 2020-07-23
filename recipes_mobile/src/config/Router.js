import React from 'react';
import { Dimensions } from 'react-native';
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
import { Login, Signup, Profile, Subjects, Topics } from '../screens';

const { height, width } = Dimensions.get('screen');

export default () => (
	<Router>
		<Stack key = 'root' hideNavBar>
			{/* <Stack key = 'auth'>
				<Scene key = 'login' component = { Login } title = 'Login' hideNavBar />
				<Scene key = 'signup' component = { Signup } title = 'Sign Up' hideNavBar />
			</Stack> */}
			<Stack key = 'nav'>
				<Tabs
					hideNavBar
					activeTintColor = '#FEE4B0'
					inactiveTintColor = '#F5717D'
					tabBarStyle = {{ backgroundColor: '#9A031E', height: height * 0.06 }}
					labelStyle = {{ fontWeight: 'bold', fontSize: 14, paddingBottom: 10 }}
				>
					<Scene key = 'profile' component = { Profile } title = 'Profile' hideNavBar />
					<Scene key = 'subjects' component = { Subjects } title = 'Subjects' hideNavBar />
				</Tabs>
				<Scene key = 'topics' component = { Topics } title = 'Topics' />
			</Stack>

		</Stack>
	</Router>
);