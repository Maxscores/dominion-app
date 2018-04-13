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
import PhaseButton from '../../../components/PhaseButton'
import CallbackWindow from '../../../components/CallbackWindow'
import dominionCards from '../../../game-utilities/dominion'
import { playerDeck } from '../../../game-utilities/game-mechanics'
import {
	resolveAttackQueue,
	resolveActionQueue,
	playCard,
	buyCard
} from '../../../game-utilities/game-engine'

export default class Table extends Component {
  constructor() {
    super();
  }

	componentDidMount() {
		getGameState(this.props.screenProps.state.gameId)
			.then((gameState) => {
				// can change this to gameState.local_player, so that players only see their deck
				let deck = playerDeck(gameState.decks, gameState.current_player);
				this.props.screenProps.setParentState({
					competitors: gameState.competitors,
					// permissions around doings by gameState.current_player === gameState.local_player
					currentPlayer: gameState.current_player,
					supply: gameState.game_cards,
					trash: gameState.trash,
					decks: gameState.decks,
					hand: [...deck.hand],
					draw: [...deck.draw],
					discard: deck.discard,
					turnOrder: gameState.turn_order,
					attackQueue: gameState.attack_stack,
					turns: gameState.turns
				}, () => {resolveAttackQueue(this.props.screenProps)})
			})
	}

	playCardFromHand(card) {
		playCard(this.props.screenProps, card)
		this.popupDialog.dismiss()
	}

	buyCardFromSupply(card) {
		buyCard(this.props.screenProps, card)
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

  showCallbackWindow() {
    if (this.props.screenProps.state.actionQueue.length > 0) {
      return(
        <CallbackWindow
          playVassal={ this.playDiscard.bind(this) }
          actionQueue={ this.props.screenProps.state.actionQueue }
          resolveActionQueue={ () => resolveActionQueue(this.props.screenProps) }
        />
      )
    }
  }

  playDiscard(card) {
    let discard = this.props.screenProps.state.discard
    let index = discard.indexOf(card)
    if (index > -1) { discard.splice(index, 1) }
    let playarea = [card, ...this.props.screenProps.state.playarea]
    this.props.screenProps.setParentState({
      discard: discard,
      playarea: playarea
    }, this.props.screenProps.setParentState(dominionCards[card]['action'](this.props.screenProps.state)))
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
						popupMethod={ this.buyCardFromSupply.bind(this) }
						style={styles.supply}
						popupAction="Buy"
					/>
          <Scoreboard />
        </View>
				<PhaseButton screenProps={this.props.screenProps}/>
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
						popupMethod={ this.playCardFromHand.bind(this) }
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
