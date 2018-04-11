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
import { getGameState, postTurn } from '../../../game-utilities/services'

import Supply from './Supply';
import Hand from './Hand';
import PlayArea from './PlayArea';
import Scoreboard from '../../../components/Scoreboard';
import TurnDetail from '../../../components/TurnDetail';
import { images } from '@assets/images'
import PopupDialog from '../../../components/PopupDialog'
import CallbackWindow from '../../../components/CallbackWindow'
import dominionCards from '../../../game-utilities/dominion'

export default class Table extends Component {
  constructor() {
    super();
  }

	componentDidMount() {
		getGameState(this.props.screenProps.state.gameId)
			.then((gameState) => {
				let deck = this.currentPlayerDeck(gameState.decks, gameState.current_player);
				this.props.screenProps.setParentState({
					competitors: gameState.competitors,
					currentPlayer: gameState.current_player,
					supply: gameState.game_cards,
					trash: gameState.trash,
					decks: gameState.decks,
					hand: [...deck.hand, 'festival', 'moneylender', 'council_room'],
					draw: ['village', ...deck.draw],
					discard: deck.discard,
					turnOrder: gameState.turn_order,
					attackStack: gameState.attack_stack,
					turns: gameState.turns
				})
			})
	}

	resolveAttackStack() {
		let allAttacks = this.props.screenProps.state.attackStack
		let currentAttacks = allAttacks[`${this.props.screenProps.state.currentPlayer}`]
		if (currentAttacks.length === 0) {
			alert("There were no pending attacks")
		} else {
			while (currentAttacks.length > 0) {
				this.playAttack(currentAttacks.shift())
			}
			this.props.screenProps.setParentState({
				attackStack: allAttacks
			})
		}
		this.nextPhase()
	}

	nextPhase() {
		this.props.screenProps.setParentState({turnPhase: this.props.screenProps.state.turnPhase + 1})
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
		this.props.screenProps.setParentState(dominionCards[card]['attack'](this.props.screenProps.state))
	}

	playCard(card) {
		if (this.canPlayCard(card)) {
			let hand = this.props.screenProps.state.hand
			let index = hand.indexOf(card)
			if (index > -1) { hand.splice(index, 1) }
			let playarea = [card, ...this.props.screenProps.state.playarea]
			this.props.screenProps.setParentState({
				hand: hand,
				playarea: playarea,
        actions: this.props.screenProps.state.actions - 1
			},
      () => {this.props.screenProps.setParentState(dominionCards[card]['action'](this.props.screenProps.state))}
    )
			/*
			Using an action must be done inside the action card logic.
			State doesn't get updated quickly enough to update actions before calling the card action method.
			*/
		} else {
			alert('You cannot play that right now')
		}
		this.popupDialog.dismiss()
	}

	canPlayCard(cardName) {
		let card = dominionCards[cardName]
		if (card['type'].includes('action') && this.hasActions() && this.isActionPhase()) {
			return true
		} else if (card['type'].includes('treasure') && this.isBuyPhase() && !this.props.screenProps.state.hasBought) {
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
			let supply = this.props.screenProps.state.supply
			supply[card]--
			let cardsGained = [...this.props.screenProps.state.cardsGained, card]
			this.props.screenProps.setParentState({
				coins: this.props.screenProps.state.coins - dominionCards[card]['cost'],
				cardsGained: cardsGained,
				supply: supply,
				buys: this.props.screenProps.state.buys - 1,
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
    this.props.screenProps.setParentState({
				cardImage: `${cardName.replace(" ", "_")}Full`,
				cardName: cardName,
				popupAction: actionName,
				popupMethod: method
			}, () => {
      this.popupDialog.show()
    })
  }

	isBuyPhase() {
		return this.props.screenProps.state.turnPhase === 3
	}

	isActionPhase() {
		return this.props.screenProps.state.turnPhase === 2
	}

	hasActions() {
		return this.props.screenProps.state.actions > 0
	}

	hasBuys() {
		return this.props.screenProps.state.buys > 0
	}

	hasEnoughCoins(card) {
		return dominionCards[card]['cost'] <= this.props.screenProps.state.coins
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
	 	gameState = {
      supply: this.props.screenProps.state.supply,
			trash: this.props.screenProps.state.trash,
			attack_stack: this.props.screenProps.state.attackStack,
			deck: {
				draw: this.props.screenProps.state.draw,
				discard: [
					...this.props.screenProps.state.discard,
					...this.props.screenProps.state.playarea,
					...this.props.screenProps.state.hand,
					...this.props.screenProps.state.cardsGained
				]
			},
      turn: {
        coins: this.props.screenProps.state.coins,
        cards_played: this.props.screenProps.state.playarea,
        cards_gained: this.props.screenProps.state.cardsGained,
        cards_trashed: this.props.screenProps.state.cardsTrashed
        }
    }
		postTurn(this.props.screenProps.state.gameId, gameState)
			.then(alert('Turn completed'))
	}

  displayWindow() {
    return this.props.screenProps.state.actionStack.length > 0
  }

  showCallbackWindow() {
    if (this.displayWindow()) {
      return(
        <CallbackWindow
          playVassal={ this.playDiscard.bind(this) }
          actionStack={ this.props.screenProps.state.actionStack }
          resolveActionStack={ this.resolveActionStack.bind(this) }
        />
      )
    }
  }

  resolveActionStack() {
    this.props.screenProps.setParentState({actionStack: this.props.screenProps.state.actionStack.slice(1)})
  }

  playDiscard(card) {
    let discard = this.props.screenProps.state.discard
    let index = discard.indexOf(card)
    if (index > -1) { discard.splice(index, 1) }
    let playarea = [card, ...this.props.screenProps.state.playarea]
    this.props.screenProps.setParentState({
      discard: discard,
      playarea: playarea
    })
    /*
    Using an action must be done inside the action card logic.
    State doesn't get updated quickly enough to update actions before calling the card action method.
    */
    this.props.screenProps.setParentState(dominionCards[card]['action'](this.props.screenProps.state))
	}


  render() {
    return (
      <View style={styles.container}>
        <TurnDetail
					actions={ this.props.screenProps.state.actions }
					coins={ this.props.screenProps.state.coins }
					buys={ this.props.screenProps.state.buys }
				/>
        <View style={styles.topContainer}>
          <Supply
						supplyCards={ this.props.screenProps.state.supply }
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
						playareaCards={ this.props.screenProps.state.playarea }
						openDialog={ this.openDialog.bind(this) }
					/>
        </View>
        <View>
          <Hand
						handCards={ this.props.screenProps.state.hand }
						openDialog={ this.openDialog.bind(this) }
						popupAction="Play"
						popupMethod={ this.playCard.bind(this) }
					/>
        </View>
        <PopupDialog
          cardImage={ this.props.screenProps.state.cardImage }
					cardName={ this.props.screenProps.state.cardName }
					popupAction={ this.props.screenProps.state.popupAction }
					popupMethod={ this.props.screenProps.state.popupMethod }
          dialog={(popupDialog) => { this.popupDialog = popupDialog; }}
        />
        { this.showCallbackWindow() }
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
