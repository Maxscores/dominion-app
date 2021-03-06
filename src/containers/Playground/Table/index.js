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
		resolveAttackQueue(this.props.screenProps)
	}

	isLocalPlayerTurn() {
		let currentPlayer = this.props.screenProps.state.currentPlayer
		let localPlayer = this.props.screenProps.state.localPlayer
		return +currentPlayer === +localPlayer
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
		if (this.isLocalPlayerTurn()) {
			this.props.screenProps.setParentState({
				cardImage: `${cardName.replace(" ", "_")}Full`,
				cardName: cardName,
				popupAction: actionName,
				popupMethod: method
			}, () => {
				this.popupDialog.show()
			})
		} else {
			this.props.screenProps.setParentState({
				cardImage: `${cardName.replace(" ", "_")}Full`,
				cardName: cardName
			}, () => {
				this.popupDialog.show()
			})
		}
  }

  showCallbackWindow() {
    if (this.props.screenProps.state.actionQueue.length > 0) {
      return(
        <CallbackWindow
          playVassal={ this.playDiscard.bind(this) }
          discardVassal={ this.discardCardFromDraw.bind(this) }
          playChapel={ this.trashFromHand.bind(this) }
          playHarbinger={ this.discardToDraw.bind(this) }
          actionQueue={ this.props.screenProps.state.actionQueue }
          resolveActionQueue={ () => resolveActionQueue(this.props.screenProps) }
        />
      )
    }
  }

  discardToDraw(cards) {
    let discard = this.props.screenProps.state.discard
    let draw = this.props.screenProps.state.draw
    cards.forEach((card) => {
      let index = discard.indexOf(card)
      draw = [...discard.splice(index, 1), ...draw]
    })
    this.props.screenProps.setParentState({
      discard: discard,
      draw: draw
    })
  }

  trashFromHand(cards) {
    let hand = this.props.screenProps.state.hand
    let trash = this.props.screenProps.state.trash
    let cardsTrashed = this.props.screenProps.state.cardsTrashed
    let cardBeingTrashed;
		let score = this.props.screenProps.state.score
    cards.forEach((card) => {
      let index = hand.indexOf(card)
      if (index > -1) {
        cardBeingTrashed = hand.splice(index, 1)
        trash.push(cardBeingTrashed)
        cardsTrashed.push(cardBeingTrashed)
      }
			if (dominonCards[card].type.includes('treasure')) {
				score[this.props.screenProps.state.localUsername] -= dominonCards[card].vp
			}
    })
    this.props.screenProps.setParentState({
      hand: hand,
      trash: trash,
      cardsTrashed: cardsTrashed,
			score: score
    })
  }

  discardCardFromDraw(count) {
    let discard = this.props.screenProps.state.discard
    let draw = this.props.screenProps.state.draw
    discard = [...discard, ...draw.splice(0, count)]
    this.props.screenProps.setParentState({
      discard: discard,
      draw: draw
    })
  }

  playDiscard(card) {
    let discard = this.props.screenProps.state.discard
    let index = discard.indexOf(card)
    if (index > -1) { discard.splice(index, 1) }
    let playarea = [...card, ...this.props.screenProps.state.playarea]
    this.props.screenProps.setParentState({
      discard: discard,
      playarea: playarea
    }, this.props.screenProps.setParentState(dominionCards[card]['action'](this.props.screenProps.state)))
	}

	showPhaseButton() {
		if (this.isLocalPlayerTurn()) {
			return <PhaseButton screenProps={this.props.screenProps}/>
		} else {
			return (
        <View style={styles.bar}>
          <Text style={styles.text}>It is not your turn</Text>
        </View>
      )
		}
	}

  render() {
    return (
      <ImageBackground source={images['background']} style={{flex: 1, position: 'relative'}}>
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
            <Scoreboard score={this.props.screenProps.state.score}/>
          </View>
  				{this.showPhaseButton()}
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
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  playContainer: {
    height: responsiveWidth(42),
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    shadowOpacity: 0,
    elevation: 0,
  },
  bar: {
    height: 26,
    backgroundColor: '#2662bd',
    borderColor: '#2662bd',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: responsiveWidth(2),
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(3),
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
})
