import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../../components/CardTile'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


let gameCards = {'copper': 10,
                 'witch': 10,
                 'village': 10,
                 'workshop': 10,
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
          cardTileImage={card}
          cardQuantity={gameCards[card]}>
        </CardTile>
      )
    };

    let firstCards = gameCardRender.slice(0, 6)
    let secondCards = gameCardRender.slice(6, 12)
    let thirdCards = gameCardRender.slice(12)

    return (
        <Swiper
          maxHeight={responsiveHeight(27)}
          maxWidth={responsiveWidth(65)}
          paginationStyle={{
            bottom: 0,
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
  }
})
