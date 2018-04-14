import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	FlatList,
	Button
} from 'react-native';

export default class GamesList extends Component {
	constructor() {
		super()
	}

	navigateToGame(game) {
		this.props.navigation.navigate('Playground', game)
	}

	games() {
		return this.props.screenProps.games.map((game) => {
			return (
				<Text
					key={game}
					onPress={ () => this.navigateToGame(game)}>
					{ game }
				</Text>
			)
		})

	}

	render() {
		return (
			<View>
				{this.games()}
			</View>
		)
	}
}
