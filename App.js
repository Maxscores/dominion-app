import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  TabNavigator
} from 'react-navigation';
import Playground from './src/containers/Playground'

const routeConfig = {
  Playground: {
    screen: Playground,
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
      <Playground />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
