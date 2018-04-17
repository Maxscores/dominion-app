import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
	Button
} from 'react-native';
import AddFriendForm from './AddFriendForm'
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default class Friends extends Component {
	constructor() {
		super()
		this.state = {
			text: ''
		}
	}

	friendsList() {
		return this.props.screenProps.state.friends.map((friend, index) => {
			return (
				<View key={index}>
					<Text>{friend.username}</Text>
				</View>
			)
		})
	}

	addFriendForm() {
		return (
			<AddFriendForm
				onChangeMethod={(text) => {this.setState({text}).bind(this)}}
				text={this.state.text}
				localPlayer={this.props.screenProps.state.localPlayer}
				friends={this.props.screenProps.state.friends}
				addFriend={this.props.screenProps.setParentState.bind(this)}
			/>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Friends List</Text>
				{ this.addFriendForm() }
				<ScrollView>
					{ this.friendsList() }
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
		paddingTop: responsiveHeight(7),
    flex: 1,
    backgroundColor: '#bfa891',
    alignItems: 'center',
  },
	text: {
		fontSize: 24,
	},
	title: {
		fontSize: 36,
		marginBottom: responsiveHeight(7)
	}
});
