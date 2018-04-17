import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	Image,
  ScrollView,
	TouchableHighlight
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { images } from '@assets/images'


export default class Account extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.screenProps.logoutUser()
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
					source={images['dominionLogo']}
					style={styles.logo}
					resizeMode='contain'
				>
				</Image>
				<Text style={styles.welcome}>Welcome, {this.props.screenProps.state.username} </Text>
				<Text style={styles.help}>
					Click on 'Games' to view your active games {"\n\n"}
					Click on 'Friends' to view your friends list and add friends{"\n\n"}
					Click on 'Play' to invite friends and start a game
				</Text>
				<TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableHighlight>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: responsiveWidth(5),
	},
	logo: {
		width: responsiveWidth(90),
	},
	welcome: {
		fontSize: 18,
		marginBottom: responsiveHeight(5),
	},
	help: {
		fontSize: 14,
		marginBottom: responsiveHeight(3),
		lineHeight: 18
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36,
		backgroundColor: '#2662bd',
		borderColor: '#2662bd',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center',
		width: responsiveWidth(80)
	}
})
