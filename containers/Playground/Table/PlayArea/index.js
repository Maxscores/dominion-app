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

export default class PlayArea extends Component {
  render() {

    let playCardRender = [];
    for (let i = 0; i < 20; i++ ) {
      playCardRender.push(
        <CardTile
          key={i}
          cardTileImage={"copper"}>
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
