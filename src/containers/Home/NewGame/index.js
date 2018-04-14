import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
	Button
} from 'react-native';


export default class NewGame extends Component {
	friendsList() {
		return this.props.screenProps.friends.map((friend, index) => {
			return (
				<View key={index}>
					<Text>{friend.username}</Text>
				</View>
			)
		})
	}

	render() {
		return (
			<View>
				<Text>NewGame</Text>
				<Text>Select Up to 3 Friends</Text>
				{ this.friendsList() }

				<Button
					title='Start New Game'
					onPress={() => alert(this.props.screenProps.currentPlayer)}
				/>
			</View>
		)
	}
}
