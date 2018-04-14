import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	Button
} from 'react-native';
import FriendsList from './FriendsList'
import AddFriendForm from './AddFriendForm'

export default class Friends extends Component {
	constructor() {
		super()
		this.state = {
			text: ''
		}
	}

	friendsList() {
		return <FriendsList friends={this.props.screenProps.friends} />
	}

	addFriendForm() {
		return (
			<AddFriendForm
				onChangeMethod={(text) => {this.setState({text}).bind(this)}}
				text={this.state.text}
			/>
		)
	}

	render() {
		return (
			<View>
				{ this.addFriendForm() }
				{ this.friendsList() }
			</View>
		)
	}
}
