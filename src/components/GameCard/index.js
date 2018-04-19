import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { getGameState, postTurn } from '../../game-utilities/services'
import { playerDeck } from '../../game-utilities/game-mechanics'
import _ from 'lodash'
import { images } from '@assets/images'

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
		this.handleClick = this.handleClick.bind(this)
	}

	gameScore() {
		if (_.values(this.state.score).length === 0) {
			return this.props.game.players.map((player, index) => {
				return (
					<Text style={this.isCurrentPlayer(player)}>{player}</Text>
				)
			})
		} else {
			return _.keys(this.state.score).map((player, index) => {
				return (
					<Text style={this.isCurrentPlayer(player)}>{player}: {this.state.score[player]}</Text>
				)
			})
		}
	}

	componentDidMount() {
		getGameState(this.props.game.id)
			.then((gameState) => {
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

	handleClick() {
		this.props.navigateToGame(this.state)
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
				onPress={this.handleClick}
				style={styles.card}>
				<View>
					<Text style={styles.title}>
						Game {this.props.game.id}
					</Text>
					<View style={styles.innerCard}>
						<Image
							source={images.dominionIcon}
							style={styles.icon}
							resizeMode='contain'
						>
						</Image>
						<View>
							{this.gameScore()}
						</View>
					</View>
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
	innerCard: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		paddingHorizontal: responsiveWidth(5),
		width: responsiveWidth(70),
		borderBottomColor: 'white',
	},
	text: {
		fontSize: 14
	},
	icon: {
		height: responsiveHeight(15),
	},
	currentPlayer: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	card: {
		width: responsiveWidth(80),
		borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',
		margin: responsiveHeight(1),
	}
});
