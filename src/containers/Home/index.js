import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  TabNavigator,
	StackNavigator
} from 'react-navigation';
import Friends from './Friends'
import NewGame from './NewGame'
import Playground from '../Playground'
import GamesList from './GamesList'


const stackRouteConfig = {
	GamesList: {
		screen: GamesList,
		navigationOptions: {
			title: 'Games List',
		},
	},
	Playground: {
		screen: Playground,
		navigationOptions: ({navigation}) => ({
			title: '',
			tabBarVisible: false
		})
	}
}

const GamesNav = StackNavigator(stackRouteConfig)

const tabRouteConfig = {
  Games: {
    screen: GamesNav,
  },
  Friends: {
    screen: Friends,
  },
  New: {
    screen: NewGame,
  },
}

const tabNavConfig = {
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

const RootNav = TabNavigator(tabRouteConfig, tabNavConfig)

export default class Home extends Component {
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
