import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Supply from './Supply';
import Hand from './Hand';
import PlayArea from './PlayArea';
import Scoreboard from '../../../components/Scoreboard';
import TurnDetail from '../../../components/TurnDetail';
import { images } from '@assets/images'
import PopupDialog from '../../../components/PopupDialog'
import dominionCards from '../../../game-utilities/dominion'
import { getGameState } from '../../../game-utilities/services'

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
			gameId: 3,
      cardImage: "copperFull",
			popupAction: null,
			playarea: [],
			actions: 1,
			buys: 1,
			coins: 0,
			cardsBought: [],
			competitors: [],
			competitorsStack: [
				{}
			],
			currentPlayer: null,
      supply: {},
      draw: [],
      discard: [],
      hand: [],
      trash: [],
			turnOrder: [],
    }
  }

	componentDidMount() {
		getGameState(this.state.gameId)
			.then((gameState) => {
				let deck = this.currentPlayerDeck(gameState.decks, gameState.current_player);
				this.setState({
					currentPlayer: gameState.current_player,
					supply: gameState.game_cards,
					trash: gameState.trash,
					hand: [...deck.hand, 'market'],
					draw: deck.draw,
					discard: deck.discard,
					turnOrder: gameState.turn_order,
				})
			})
	}


	currentPlayerDeck(decks, currentPlayer) {
		let deck = decks.find((deck) => {
			return deck.player_id === currentPlayer
		})
		let result = {
			hand: deck.draw.splice(0,5),
			draw: deck.draw,
			discard: deck.discard
		}

		return result
	}

	playCard(card) {
		// moveCard(card, hand, playarea)
		let hand = this.state.hand
		let index = hand.indexOf(card)
		if (index > -1) { hand.splice(index, 1) }
		let playarea = [card, ...this.state.playarea]
		this.setState({hand: hand, playarea: playarea})
		this.setState(dominonCards[card](this.state))
		this.popupDialog.dismiss()
	}

	buyCard(card) {
		let supply = this.state.supply
		supply[card]--
		let cardsBought = [...this.state.cardsBought, card]

		this.setState({cardsBought: cardsBought, supply: supply})
		this.popupDialog.dismiss()
	}

  openDialog(cardName, actionName, method) {
    this.setState({
				cardImage: `${cardName}Full`,
				cardName: cardName,
				popupAction: actionName,
				popupMethod: method
			}, () => {
      this.popupDialog.show()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TurnDetail
					actions={ this.state.actions }
					coins={ this.state.coins }
					buys={ this.state.buys }
				/>
        <View style={styles.topContainer}>
          <Supply
						supplyCards={ this.state.supply }
						openDialog={ this.openDialog.bind(this) }
						popupMethod={ this.buyCard.bind(this) }
						style={styles.supply}
						popupAction="Buy"
					/>
          <Scoreboard />
        </View>
        <View style={styles.playContainer}>
          <PlayArea
						playareaCards={ this.state.playarea }
						openDialog={ this.openDialog.bind(this) }
					/>
        </View>
        <View>
          <Hand
						handCards={ this.state.hand }
						openDialog={ this.openDialog.bind(this) }
						popupAction="Play"
						popupMethod={ this.playCard.bind(this) }
					/>
        </View>
        <PopupDialog
          cardImage={ this.state.cardImage }
					cardName={ this.state.cardName }
					popupAction={ this.state.popupAction }
					popupMethod={ this.state.popupMethod }
          dialog={(popupDialog) => { this.popupDialog = popupDialog; }}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  playContainer: {
    height: responsiveWidth(60),
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row'
  },
})
