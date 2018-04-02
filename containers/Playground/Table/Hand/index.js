import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';

import CardTile from '../../../../components/CardTile'


let hand = ['village', 'witch', 'workshop', 'copper', 'copper', 'copper', 'copper', 'copper']


export default class Table extends Component {
  render() {
    let handRender = []

    handComposition = hand.reduce((result, card) => {
      if (result[card] === undefined) {result[card] = 0}
      result[card] += 1
      return result
    }, {})

    for(var card in handComposition){
      handRender.push(
        <CardTile
        cardTileImage={card}
        cardQuantity={handComposition[card]}>
        </CardTile>
      )
    }
    return (
      <ScrollView horizontal>
        { handRender }
      </ScrollView>
    )
  }
}
