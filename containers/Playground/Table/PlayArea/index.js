import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../../components/CardTile'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


let copperImage = require("../../../../assets/images/copper.png")
let playCards = ['card103',
                 'card114',
                 'card142',
                 'card131',
                 'copper1',
                 'card115',
                 'card145',
                 'card131',
                 'copper1',
                 'card115',
                 'card145',
                 'card131',
                 'copper1',
                 'card115',
                 'card145',
                 'card131',
                 'copper1',
                 'card115',
                 'card115',
                 'card145',
                 'card131',
                 'copper1',
                 'card115',
                 'card145',
                 'card135',
                 'copper2',
                 'silver2']

export default class PlayArea extends Component {
  render() {

    let playCardRender = [];
    for (let i = 0; i < playCards.length; i++ ) {
      playCardRender.push(
        <CardTile
          key={i}
          cardTileImage={copperImage}>
        </CardTile>
      )
    };

    return (
      <ScrollView horizontal>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
          { playCardRender.slice(0,10) }
          </View>
          <View style={styles.rowContainer}>
          { playCardRender.slice(10,20) }
          </View>
          <View style={styles.rowContainer}>
          { playCardRender.slice(20,30) }
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#3c0563',
    flexDirection: 'column',
  }
})
