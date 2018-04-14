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
		this.props.navigation.navigate('Playground', {gameId: game})
	}

	games() {
		return this.props.screenProps.games.map((game) => {
			return (
				<Text
					key={game}
					style={styles.text}
					onPress={ () => this.navigateToGame(game)}>
					{ game }
				</Text>
			)
		})

	}

	render() {
		return (
			<View style={styles.container}>
				{this.games()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abcdef',
    alignItems: 'center',
    justifyContent: 'center',
  },
	text: {
		fontSize: 24
	}
});
