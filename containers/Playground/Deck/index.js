import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import CardTile from '../../../components/CardTile'
import { responsiveFontSize } from 'react-native-responsive-dimensions';


let deckComposition = {'copper': 7, 'estate': 3, 'colony': 4, 'hello': 5, 'card_5': 2}
let discard = ['copper', 'copper', 'copper', 'copper']
let trash = ['copper', 'copper']

export default class Table extends Component {
  render() {
    let deckRender = []

    for(var card in deckComposition){
      deckRender.push(
        <CardTile
          cardHeight={18}
          cardWidth={18}
          cardTileImage={card}
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
          cardHeight={18}
          cardWidth={18}
          cardTileImage={card}
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
          cardHeight={18}
          cardWidth={18}
          cardTileImage={card}
          cardQuantity={trashComposition[card]}>
        </CardTile>
      )
    }

    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        <Text style={styles.textCenter}>Deck</Text>
        <View style={styles.cardContainer}>
          { deckRender }
        </View>
        <Text style={styles.textCenter}>Discard</Text>
        <View style={styles.cardContainer}>
          { discardRender }
        </View>
        <Text style={styles.textCenter}>Trash</Text>
        <View style={styles.cardContainer}>
          { trashRender }
        </View>
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
