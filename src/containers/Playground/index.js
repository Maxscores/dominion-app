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

import { getGameState, postTurn } from '../../game-utilities/services'


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
			gameId: 3,
			currentPlayer: null,
			decks: {},
			supply: {},
      draw: [],
      discard: [],
      hand: [],
      trash: [],
			turnOrder: [],
			playarea: [],
			actions: 1,
			buys: 1,
			coins: 0,
			cardsGained: [],
			cardsTrashed: [],
			hasBought: false,
			competitors: [],
			attackStack: {},
			actionStack: [],
			cardImage: "copperFull",
			turnPhase: 1,
			popupAction: null,
		}
	}

  render() {
    return (
      <RootNav screenProps={{state: this.state, setParentState: this.setState.bind(this)}} />
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