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

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      cardImage: "copperFull",
			popupAction: null,
      supply: {'bandit': 10,
                       'witch': 10,
                       'village': 10,
                       'workshop': 10,
                       'copper': 60,
                       'silver': 60,
                       'gold': 30,
                       'estate': 10,
                       'duchy': 10,
                       'province': 10,
                       'harbinger': 10,
                       'laboratory': 10,
                       'market': 10,
                       'merchant': 10,
                       'moat': 10,
                       'sentry': 10,
                       'vassal': 10 },
      playarea: ['copper', 'copper', 'copper'],
      draw: [
      				"copper",
      				"copper",
      				"estate",
      				"copper",
      				"copper"
      			],
      discard: [
      				"copper",
      				"copper",
      				"copper",
      				"estate",
      				"estate",
      				"silver"
      			],
      hand: [
              'estate',
              'copper',
              'village',
              'village',
              'gold'
            ],
      trash: [],
			cardsBought: [],
    }
  }

	playCard(card) {
		// moveCard(card, hand, playarea)
		let hand = this.state.hand
		let index = hand.indexOf(card)
		if (index > -1) { hand.splice(index, 1) }
		let playarea = [card, ...this.state.playarea]

		this.setState({hand: hand, playarea: playarea})
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
        <TurnDetail />
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
