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
        <Text style={styles.turnDetailText}>Coins: { this.props.coins }</Text>
        <Text style={styles.turnDetailText}>Actions: { this.props.actions }</Text>
        <Text style={styles.turnDetailText}>Buys: { this.props.buys }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  turnDetail: {
    height: responsiveHeight(5),
    backgroundColor: '#abcdef',
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  turnDetailText: {
    fontSize: responsiveFontSize(2.7),
  }
})
