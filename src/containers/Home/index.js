import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  TabNavigator
} from 'react-navigation';
import Games from './Games'
import Friends from './Friends'
import NewGame from './NewGame'

const routeConfig = {
  Games: {
    screen: Games,
  },
  Friends: {
    screen: Friends,
  },
  New: {
    screen: NewGame,
  },
}

const navConfig = {
  tabBarOptions: {
    labelStyle: {
      fontSize: 22,
    },
    style: {
      height: 36,
      bottom: 6,
    }
  }
}

const RootNav = TabNavigator(routeConfig, navConfig)

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			currentPlayer: null,
			games: [],
			friends: []
		}
	}

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
