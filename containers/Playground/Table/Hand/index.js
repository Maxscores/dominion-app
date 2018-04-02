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
let copperImage = require("../../../../assets/images/copper.png")


let hand = ['estate', 'copper_1', 'copper_2', 'copper_3', 'copper_4', 'copper_5', 'copper_6', 'copper_7']


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
        cardHeight={18}
        cardWidth={18}
        cardTileImage={copperImage}
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
