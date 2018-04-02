import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Supply from './Supply';
import Hand from './Hand';
import PlayArea from './PlayArea';
import Scoreboard from '../../../components/Scoreboard';
import TurnDetail from '../../../components/TurnDetail';

export default class Table extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TurnDetail />
        <View style={styles.topContainer}>
          <Supply style={styles.supply}/>
          <Scoreboard />
        </View>
        <View style={styles.playContainer}>
          <PlayArea />
        </View>
        <View>
          <Hand />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  playContainer: {
    height: responsiveWidth(60),
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row'
  },
  supply: {
  }
})
