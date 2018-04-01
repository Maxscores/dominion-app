import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { StackNavigator } from 'react-navigation';

import TurnSummary from '../../../components/TurnSummary'


export default class Turns extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Turns</Text>
        <ScrollView>
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
          <TurnSummary />
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(4),
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#abcdef'
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
  },
})
