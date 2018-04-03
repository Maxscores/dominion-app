import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../../components/CardTile'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


let gameCards = {'bandit': 10,
                 'witch': 10,
                 'village': 10,
                 'workshop': 10,
                 'copper': 60,
                 'silver': 60,
                 'gold': 30,
                 'estate': 10,
                 'duchy': 10,
                 'province': 10,
                 'harbinger': 10,
                 'laboratory': 10,
                 'market': 10,
                 'merchant': 10,
                 'moat': 10,
                 'sentry': 10,
                 'vassal': 10 }

export default class Supply extends Component {
  render() {

    let gameCardRender = [];

    for (var card in gameCards) {
      gameCardRender.push(
        <CardTile
          key={card}
          cardHeight={18}
          cardWidth={18}
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
