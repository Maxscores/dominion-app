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
    backgroundColor: 'rgba(191, 17, 49, 0.4)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  turnDetailText: {
    fontSize: responsiveFontSize(2.7),
    marginTop: responsiveHeight(0.5),
    shadowOpacity: 0,
    elevation: 0,
  }
})
