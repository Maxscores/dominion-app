import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';

export default class TurnDetail extends Component<Props> {
  render() {
    return (
      <View style={styles.turnDetail}>
        <Text style={styles.turnDetailText}>Coins: 3</Text>
        <Text style={styles.turnDetailText}>Actions: 1</Text>
        <Text style={styles.turnDetailText}>Buys: 1</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  turnDetail: {
    marginTop: responsiveHeight(4),
    height: responsiveHeight(5),
    backgroundColor: 'maroon',
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  turnDetailText: {
    fontSize: responsiveFontSize(2.7),
  }
})
