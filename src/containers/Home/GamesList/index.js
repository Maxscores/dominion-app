import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
	Button
} from 'react-native';
import GameCard from '../../../components/GameCard'
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default class GamesList extends Component {
	constructor() {
		super()
	}

	navigateToGame(game) {
		this.props.navigation.navigate('Playground', {game: game})
	}

	games() {
		return this.props.screenProps.state.games.map((game) => {
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
				<Text style={styles.title}>Active Games</Text>
					<ScrollView>
						{this.games()}
					</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
		paddingTop: responsiveHeight(7),
    backgroundColor: '#bfa891',
    alignItems: 'center',
		height: responsiveHeight(90),
  },
	text: {
		fontSize: 24,
	},
	title: {
		fontSize: 36,
		marginBottom: responsiveHeight(7)
	}
});
