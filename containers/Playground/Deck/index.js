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
    this.state = {
      cardImage: "copperFull",
      deckComposition: {'copper': 7, 'estate': 3, 'vassal': 4, 'moat': 5, 'militia': 2},
      discard: ['copper', 'copper', 'copper', 'copper'],
      trash: ['copper', 'copper'],
    }
    this.openDialog = this.openDialog.bind(this)
  }

  cardTile(card, quantity) {
    return (
      <CardTile
        openDialog={ this.openDialog }
        key={card}
        cardHeight={23.5}
        cardWidth={23.5}
        cardTileImage={card}
        cardQuantity={quantity}>
      </CardTile>
    )
  }

  renderDeck() {
    let deckRender = []

    for(var card in this.state.deckComposition){
      deckRender.push(
        this.cardTile(card, this.state.deckComposition[card])
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
    let discardComposition = this.cardComposition(this.state.discard)
    let discardRender = []

    for(var card in discardComposition){
      discardRender.push(
        this.cardTile(card, discardComposition[card])
      )
    }
    return discardRender
  }

  renderTrash() {
    let trashComposition = this.cardComposition(this.state.trash)
    let trashRender = []

    for(var card in trashComposition){
      trashRender.push(
        this.cardTile(card, trashComposition[card])
      )
    }
    return trashRender
  }

  openDialog(cardName) {
		this.setState({
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
          cardImage={ this.state.cardImage }
          dialog={(popupDialog) => { this.popupDialog = popupDialog; }}
        />
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
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
