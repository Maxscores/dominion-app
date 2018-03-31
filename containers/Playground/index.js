import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  TabNavigator
} from 'react-navigation';
import Table from './Table'
import Deck from './Deck'
import Turns from './Turns'

const routeConfig = {
  Table: {
    screen: Table,
  },
  Deck: {
    screen: Deck,
  },
  Turns: {
    screen: Turns,
  },
}

const navConfig = {
  tabBarOptions: {
    labelStyle: {
      fontSize: 22,
    }
  }
}

const RootNav = TabNavigator(routeConfig, navConfig)

export default class App extends Component {
  render() {
    return (
      <RootNav />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abcdef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
