import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Supply from './Supply';
import Scoreboard from '../../../components/Scoreboard';

export default class Table extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Supply style={styles.supply}/>
          <Scoreboard />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row'
  },
  supply: {
  }
})
