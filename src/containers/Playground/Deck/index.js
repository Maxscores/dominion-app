import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import CardTile from '../../../components/CardTile'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog from '../../../components/PopupDialog'


export default class Table extends Component {

  constructor() {
    super()
    this.openDialog = this.openDialog.bind(this)
  }

	currentPlayerDeck(decks, currentPlayer) {
		let deck = decks.find((deck) => {
			return deck.player_id === currentPlayer
		})
		let result = {
			deckComposition: deck.deck_makeup,
			discard: deck.discard
		}
		return result
	}

  cardTile(card, quantity) {
    return (
      <CardTile
        openDialog={ this.openDialog }
        key={card}
        cardHeight={23.5}
        cardWidth={23.5}
        cardName={card}
        cardQuantity={quantity}>
      </CardTile>
    )
  }

  renderDeck() {
    let deckRender = []
		let deckComposition = this.currentPlayerDeck(this.props.screenProps.state.decks, this.props.screenProps.state.localPlayer).deckComposition
    for(var card in deckComposition){
      deckRender.push(
        this.cardTile(card, deckComposition[card])
      )
    }
    return deckRender
  }

  cardComposition(collection) {
    return collection.reduce((result, card) => {
      if (result[card] === undefined) {result[card] = 0}
      result[card] += 1
      return result
    }, {})
  }

  renderDiscard() {
		let localPlayer = this.props.screenProps.state.localPlayer
		let currentPlayer = this.props.screenProps.state.currentPlayer
		let discard
		if (localPlayer === currentPlayer) {
			discard = this.props.screenProps.state.discard
		} else {
			discard = this.currentPlayerDeck(this.props.screenProps.state.decks, this.props.screenProps.state.localPlayer).discard
		}
    let discardComposition = this.cardComposition(discard)
    let discardRender = []

    for(var card in discardComposition){
      discardRender.push(
        this.cardTile(card, discardComposition[card])
      )
    }
    return discardRender
  }

  renderTrash() {
    let trashComposition = this.cardComposition(this.props.screenProps.state.trash)
    let trashRender = []

    for(var card in trashComposition){
      trashRender.push(
        this.cardTile(card, trashComposition[card])
      )
    }
    return trashRender
  }

  openDialog(cardName) {
		this.props.screenProps.setParentState({
				cardImage: `${cardName}Full`,
				cardName: cardName,
			}, () => {
      this.popupDialog.show()
  })}

  render() {
    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        <Text style={styles.textCenter}>Deck</Text>
        <View style={styles.cardContainer}>
          { this.renderDeck() }
        </View>
        <Text style={styles.textCenter}>Discard</Text>
        <View style={styles.cardContainer}>
          { this.renderDiscard() }
        </View>
        <Text style={styles.textCenter}>Trash</Text>
        <View style={styles.cardContainer}>
          { this.renderTrash() }
        </View>
        <PopupDialog
          cardImage={ this.props.screenProps.state.cardImage }
          dialog={(popupDialog) => { this.popupDialog = popupDialog; }}
        />
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#abcdef',
  },
  textCenter: {
    textAlign: 'center',
    fontSize: responsiveFontSize(3.7),
  },
  container: {
    paddingTop: 15,
    justifyContent: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
})
