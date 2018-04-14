import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	Button
} from 'react-native';

export default class AddFriendForm extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<View>
				<Text>Add Friend by username</Text>
				<TextInput
					onChangeText={this.props.onChangeMethod}
					value={this.props.text}
				/>
				<Button
					title='Find User'
				/>
			</View>
		)
	}
}
