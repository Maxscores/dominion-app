import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import CardTile from '../../../components/CardTile'

let copperImage = require("../../../assets/images/copper.png")

let deckComposition = {'copper': 7, 'estate': 3, 'colony': 4, 'hello': 5, 'card_5': 2}
let discard = ['copper', 'copper', 'copper', 'copper']
let trash = ['copper', 'copper']

export default class Table extends Component {
  render() {
    let deckRender = []

    for(var card in deckComposition){
      deckRender.push(
        <CardTile
          cardTileImage={copperImage}
          cardQuantity={deckComposition[card]}>
        </CardTile>
      )
    }

    let discardRender = []

    discardComposition = discard.reduce((result, card) => {
      if (result[card] === undefined) {result[card] = 0}
      result[card] += 1
      return result
    }, {})

    for(var card in discardComposition){
      discardRender.push(
        <CardTile
          cardTileImage={copperImage}
          cardQuantity={discardComposition[card]}>
        </CardTile>
      )
    }

    let trashRender = []

    trashComposition = trash.reduce((result, card) => {
      if (!result[card]) {result[card] = 0}
      result[card] += 1
      return result
    }, {})

    for(var card in trashComposition){
      trashRender.push(
        <CardTile
          cardTileImage={copperImage}
          cardQuantity={trashComposition[card]}>
        </CardTile>
      )
    }

    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        <Text>Deck</Text>
        <View style={styles.cardContainer}>
          { deckRender }
        </View>
        <Text>Discard</Text>
        <View style={styles.cardContainer}>
          { discardRender }
        </View>
        <Text>Trash</Text>
        <View style={styles.cardContainer}>
          { trashRender }
        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  scrollContainer: {
  },
  container: {
    paddingTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abcdef',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
  },
})
