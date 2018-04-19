import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableHighlight,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { getGameState, postTurn } from '../../game-utilities/services'
import { playerDeck } from '../../game-utilities/game-mechanics'


export default class GameCard extends Component<Props> {
	constructor() {
		super()
		this.state = {
			currentPlayer: null,
			score: {},
			decks: {},
			supply: {},
			draw: [],
			discard: [],
			hand: [],
			trash: [],
			status: "",
			turnOrder: [],
			competitors: [],
			attackQueue: {},
			turns: [],
		}
	}

	gamePlayers() {
		return this.props.game.players.map((player, index) => {
			return (
				<Text style={this.isCurrentPlayer(player)}>{player}</Text>
			)
		})
	}

	componentDidMount() {
		getGameState(this.props.game.id)
			.then((gameState) => {
				console.warn('back!')
				let deck = playerDeck(gameState.decks, this.props.localPlayer);
				this.setState({
					currentPlayer: gameState.current_player,
					score: gameState.score,
					decks: gameState.decks,
					supply: gameState.game_cards,
					draw: [...deck.draw],
					discard: deck.discard,
					hand: [...deck.hand],
					trash: gameState.trash,
					status: gameState.status,
					turnOrder: gameState.turn_order,
					competitors: gameState.competitors,
					attackQueue: gameState.attack_queue,
					turns: gameState.turns
				})
			})
	}

	isCurrentPlayer(player) {
		if (player.toLowerCase() === this.props.game.current.toLowerCase()) {
			return styles.currentPlayer
		} else {
			return styles.text
		}
	}

	render() {
		return (
			<TouchableHighlight
				onPress={ () => this.props.navigateToGame(this.state)}
				style={styles.card}>
				<View>
				<Text style={styles.text}>
					Game {this.props.game.id}
				</Text>
					{this.gamePlayers()}
				</View>
			</TouchableHighlight>
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
		fontSize: 20
	},
	currentPlayer: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	card: {
		height: responsiveHeight(15),
		width: responsiveWidth(80),
		borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',
		margin: responsiveHeight(1),
	}
});
