import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	Button
} from 'react-native';

export default class FriendsList extends Component {
	constructor() {
		super()
		this.state = {
			text: ''
		}
	}

	friendsList() {
		return this.props.friends.map((friend, index) => {
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
				<Text>Friends List</Text>
				{ this.friendsList() }
			</View>
		)
	}
}
