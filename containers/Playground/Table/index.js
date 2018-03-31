import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Supply from './Supply';

export default class Table extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Supply style={styles.supply}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  supply: {
  }
})
