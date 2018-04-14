import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import Playground from '../../Playground'
import GamesList from './GamesList'

const routeConfig = {
	GamesList: {
		screen: GamesList,
		navigationOptions: {
			title: 'Games List',
			tabBarVisible: false,
		},
	},
	Playground: {
		screen: Playground,
		navigationOptions: ({navigation}) => ({
			title: '',
		})
	}
}

const StackNav = StackNavigator(routeConfig)

export default class Games extends Component {
	render() {
		return (
			<StackNav screenProps={this.props.screenProps}/>
		)
	}
}
