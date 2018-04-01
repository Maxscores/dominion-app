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

export default class TurnSummary extends Component<Props> {
  render() {
    return (
      <View style={styles.turn}>
        <View style={styles.turnSummary}>
          <Text>Turn #</Text>
          <Text>Player: </Text>
        </View>
        <View style={styles.turnSummary}>
          <Text style={styles.turnSummaryText}>Coins: 3</Text>
          <Text style={styles.turnSummaryText}>Cards Played: 1</Text>
          <Text style={styles.turnSummaryText}>Cards Bought: 1</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  turn: {
    height: responsiveHeight(7.5),
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  turnSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  turnSummaryText: {
    fontSize: responsiveFontSize(1.5),
  }
})
