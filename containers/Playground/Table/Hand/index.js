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

let hand = ['estate', 'copper', 'village', 'village', 'gold']


export default class Table extends Component {

  constructor(props) {
    super(props);
  }

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
          openDialog={ this.props.openDialog }
          cardHeight={23.5}
          cardWidth={23.5}
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
