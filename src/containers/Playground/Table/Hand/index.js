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


export default class Table extends Component {

  constructor(props) {
    super(props);
  }

  handComposition() {
    return this.props.handCards.reduce((result, card) => {
      if (result[card] === undefined) {result[card] = 0}
      result[card] += 1
      return result
    }, {})
  }

  renderHand() {
    let handComposition = this.handComposition()
    let handRender = []
    for(var card in handComposition){
      handRender.push(
        <CardTile
          key={card}
          openDialog={ this.props.openDialog }
          cardHeight={23.5}
          cardWidth={23.5}
					cardName={card}
					popupAction={ this.props.popupAction }
					popupMethod={ this.props.popupMethod }
          cardQuantity={handComposition[card]}>
        </CardTile>
      )
    }
    return handRender
  }

  render() {

    return (
      <View>
        <Text
          style={styles.text}
        >
        ↙ Your Hand ↘︎
        </Text>
        <ScrollView horizontal>
          { this.renderHand() }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  }
})
