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

export default class Scoreboard extends Component<Props> {
  render() {
    return (
      <View style={styles.scoreboard}>
        <Text style={styles.scoreboardText}>Player 1</Text>
        <Text style={styles.scoreboardText}>Player 2</Text>
        <Text style={styles.scoreboardText}>Player 3</Text>
        <Text style={styles.scoreboardText}>Player 4</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scoreboard: {
    paddingTop: responsiveHeight(5),
    width: responsiveWidth(35),
    height: responsiveHeight(27),
    backgroundColor: 'green',
    alignItems: 'center'
  },
  scoreboardText: {
    fontSize: responsiveFontSize(2.7),
  }
})
