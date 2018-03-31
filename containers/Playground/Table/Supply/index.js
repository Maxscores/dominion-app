import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../../components/CardTile'

let copperImage = require("../../../../assets/images/copper.png")
let gameCards = {'card103': 10,
                 'card114': 10,
                 'card142': 10,
                 'card131': 10,
                 'copper1': 60,
                 'silver2': 60,
                 'gold4': 30,
                 'estate3': 20,
                 'card69': 10,
                 'card22': 10,
                 'card33': 10,
                 'card34': 10,
                 'card541': 10,
                 'card61': 10,
                 'card73': 10,
                 'card48': 10,
                 'card201': 10 }

export default class Supply extends Component {
  render() {

    let gameCardRender = [];

    for (var card in gameCards) {
      gameCardRender.push(
        <CardTile
          key={card}
          cardTileImage={copperImage}
          cardQuantity={gameCards[card]}>
        </CardTile>
      )
    };

    let firstCards = gameCardRender.slice(0, 6)
    let secondCards = gameCardRender.slice(6, 12)
    let thirdCards = gameCardRender.slice(12)

    return (
        <Swiper
          maxHeight={200}
          paginationStyle={{
            top: -130,
            left: -80,
          }}>
          <View style={styles.container}>
            { firstCards }
          </View>
          <View style={styles.container}>
            { secondCards }
          </View>
          <View style={styles.container}>
            { thirdCards }
          </View>
        </Swiper>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#abcdef',
    maxHeight: 200,
    width: 240,
  }
})
