import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	FlatList,
	Button
} from 'react-native';
import GameCard from '../../../components/GameCard'

export default class GamesList extends Component {
	constructor() {
		super()
	}

	navigateToGame(game) {
		this.props.navigation.navigate('Playground', {game: game})
	}

	games() {
		return this.props.screenProps.games.map((game) => {
			return (
				<GameCard
					key={game}
					style={styles.text}
					navigateToGame={ () => this.navigateToGame(game)}
					game={ game }
					>
				</GameCard>
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
    backgroundColor: '#bfa891',
    alignItems: 'center',
    justifyContent: 'center',
  },
	text: {
		fontSize: 24
	}
});
