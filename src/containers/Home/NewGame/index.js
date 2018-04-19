import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
	View,
	TouchableHighlight
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple'
import {postNewGame} from '../../../game-utilities/services'
import { playerDeck } from '../../../game-utilities/game-mechanics'

import _ from 'lodash'

const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

export default class NewGame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFriends: [],
			id: null,
			currentPlayer: null,
			currentPlayerUsername: '',
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
			turns: []
		}
		this.updateGameState = this.updateGameState.bind(this)
	}


	updateGameState(gameState) {
		let deck = playerDeck(gameState.decks, this.props.screenProps.state.localPlayer);
		this.setState({
			id: gameState.game_id,
			currentPlayer: gameState.current_player,
			currentPlayerUsername: gameState.current_player_username,
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
		}, () => {
			let game = _.merge(this.state, {updateGameState: this.updateGameState})
			this.props.navigation.navigate('Playground', {game: game})
		})
	}

	checkMaxSelected(maxCount) {
		if (this.state.selectedFriends.length <= maxCount && this.state.selectedFriends.length > 0) {
			let players = this.state.selectedFriends.map((friend) => {
				return friend.value
			})
			players.unshift(this.props.screenProps.state.localPlayer)
			postNewGame(players)
				.then((gameState) => {
					let game = {id: gameState.game_id, players: gameState.players}
					this.props.screenProps.setParentState({active_games: [...this.props.screenProps.state.active_games, game]})
					this.updateGameState(gameState)
				})
		} else {
			alert(`Please select 1 to ${maxCount} friends`)
		}
	}

	onSelectedFriendsChange(selectedFriends) {
		this.setState({selectedFriends: selectedFriends})
	}

	friends() {
		return this.props.screenProps.state.friends.map((friend) => {
			return {label: friend.username, value: friend.player_id}
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>New Game</Text>
				<Text>Select 1 to 3 Friends</Text>
				<ScrollView>
					<SelectMultiple
						items={this.friends()}
						rowStyle={styles.row}
						renderLabel={renderLabel}
						selectedItems={this.state.selectedFriends}
						onSelectionsChange={this.onSelectedFriendsChange.bind(this)}
					/>
				</ScrollView>
				<TouchableHighlight
					style={styles.button}
					onPress={
						() => this.checkMaxSelected(3)
					}
					underlayColor='#99d9f4'
				>
					<Text style={styles.buttonText}>Start New Game</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		paddingTop: responsiveHeight(2),
    backgroundColor: '#bfa891',
    alignItems: 'center',
  },
	text: {
		fontSize: 24,
	},
	title: {
		fontSize: 36,
		marginBottom: responsiveHeight(3)
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center',
	},
	button: {
		height: 36,
		backgroundColor: '#2662bd',
		borderColor: '#2662bd',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'center',
		justifyContent: 'center',
		width: responsiveWidth(80)
	},
	row: {
		width: responsiveWidth(80),
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: 'white',
		backgroundColor: '#bfa891',
	}
});
