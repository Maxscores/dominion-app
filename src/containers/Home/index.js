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
			header: null,
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
  },
	lazy: false
}

const RootNav = TabNavigator(tabRouteConfig, tabNavConfig)

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			currentPlayer: 1,
			games: [
				{
					id: 3,
					players: ['max', 'tyler', 'dorothy']
				},
				{
					id: 4,
					players: ['max', 'tyler']
				},
				{
					id: 5,
					players: ['max', 'dorothy', 'tyler', 'tori']
				}
			],
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
      <RootNav style={styles.container} screenProps={this.state}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfa891',
    alignItems: 'center',
		height: responsiveHeight(100),
    justifyContent: 'center',
  },
});
