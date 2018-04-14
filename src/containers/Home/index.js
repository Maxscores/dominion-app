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
	static navigationOptions = ({navigation, screenProps}) => ({
		tabBarVisible: navigation.state.params.hideTabBar != undefined ? !navigation.state.params.hideTabBar: true
	})

	constructor() {
		super()
		this.state = {
			currentPlayer: 1,
			games: [1, 2, 3, 4, 5],
			friends: [
				{username: 'tyler', id: 2},
				{username: 'dorothy', id: 3},
				{username: 'gave', id: 4},
				{username: 'sam', id: 5}
			]
		}
	}



  render() {
		console.warn(RootNav)
    return (
      <RootNav screenProps={this.state}/>
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
