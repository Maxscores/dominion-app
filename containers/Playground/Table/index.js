import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../components/CardTile'
let copperImage = require("../../../assets/images/copper.png")

let gameCards = {"card103": 10, "card114": 10,
                 "card142": 10, "card131": 10,
                 "copper1": 60, "silver2": 60,
                 "gold4": 30, "estate3": 20,
                 "card69": 10, "card22": 10,
                 "card33": 10, "card34": 10,
                 "card541": 10, "card61": 10,
                 "card73": 10, "card48": 10,
                 "card201": 10 }

export default class Table extends Component {
  render() {

    let gameCardRender = []

    for(var card in gameCards){
      gameCardRender.push(
        <CardTile
          cardTileImage={copperImage}
          cardQuantity={gameCards[card]}>
        </CardTile>
      )
    }


    return (
      <View>
        <Swiper>
          <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Text>hi</Text>
            // { gameCardRender }
          </View>
          </View>
          <View style={styles.container}>
          <Text>hi</Text>

          // { gameCardRender.slice(6,11) }
          </View>
          <View style={styles.container}>

          <Text>hi</Text>
          // { gameCardRender.slice(12) }
          </View>
        </Swiper>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abcdef'
  }
})
