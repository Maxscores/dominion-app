import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
	Button
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
			turnPhase: 1,
			popupAction: null,
			hasBought: false,
			playarea: [],
			actions: 1,
			buys: 1,
			coins: 0,
			cardsBought: [],
			competitors: [],
			attackStack: {},
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
					hand: [...deck.hand, 'market', 'market'],
					draw: deck.draw,
					discard: deck.discard,
					turnOrder: gameState.turn_order,
					attackStack: {"1": [], "2": []},
				})
			})
	}

	resolveAttackStack() {
		let allAttacks = this.state.attackStack
		let currentAttacks = allAttacks[`${this.state.currentPlayer}`]
		if (currentAttacks.length === 0) {
			alert("There were no pending attacks")
		} else {
			while (currentAttacks.length > 0) {
				this.playAttack(currentAttacks.shift())
			}
			this.setState({
				attackStack: allAttacks
			})
		}
		this.nextPhase()
	}

	nextPhase() {
		this.setState({turnPhase: this.state.turnPhase + 1})
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

	playAttack(card) {
		console.warn(`Attack ${card} played`)
		// this.setState(dominionCards[card]['attack'](this.state))
	}

	playCard(card) {
		if (this.canPlayCard(card)) {
			let hand = this.state.hand
			let index = hand.indexOf(card)
			if (index > -1) { hand.splice(index, 1) }
			let playarea = [card, ...this.state.playarea]
			this.setState({
				hand: hand,
				playarea: playarea
			})
			this.setState(dominionCards[card]['action'](this.state))
		} else {
			alert('You cannot play that right now')
		}
		this.popupDialog.dismiss()
	}

	canPlayCard(cardName) {
		let card = dominionCards[cardName]
		if (card['type'].includes('action') && this.hasActions() && this.isActionPhase()) {
			return true
		} else if (card['type'].includes('treasure') && this.isBuyPhase() && !this.state.hasBought) {
			return true
		} else {
			return false
		}
	}

	canBuyCard(card) {
		if (this.hasEnoughCoins(card) && this.isBuyPhase() && this.hasBuys()) {
			return true
		} else {
			return false
		}
	}

	buyCard(card) {
		if (this.canBuyCard(card)) {
			let supply = this.state.supply
			supply[card]--
			let cardsBought = [...this.state.cardsBought, card]
			this.setState({
				coins: this.state.coins - dominionCards[card]['cost'],
				cardsBought: cardsBought,
				supply: supply,
				buys: this.state.buys - 1,
				hasBought: true
			})
		} else if (!this.isBuyPhase()) {
			alert('It is not the buy phase')
		} else {
			alert('You do not have enough coins or buys')
		}
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

	isBuyPhase() {
		return this.state.turnPhase === 3
	}

	isActionPhase() {
		return this.state.turnPhase === 2
	}

	hasActions() {
		return this.state.actions > 0
	}

	hasBuys() {
		return this.state.buys > 0
	}

	hasEnoughCoins(card) {
		return dominionCards[card]['cost'] <= this.state.coins
	}

	nextPhaseButton() {
		if (this.isActionPhase()) {
			return "Finish Actions"
		} else if (this.isBuyPhase()) {
			return "Finish Buys"
		} else {
			return `Resolve Pending Attacks`
		}
	}

	completePhase() {
		if (this.isActionPhase()) {
			this.nextPhase()
		} else if (this.isBuyPhase()) {
			this.finishTurn()
		} else {
			this.resolveAttackStack()
		}
	}

	finishTurn() {
		alert("Turn Completed")
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
				<Button
					title={this.nextPhaseButton()}
					onPress={ () => this.completePhase() }>
				</Button>
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
