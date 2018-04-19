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

export default class Playground extends Component {
	constructor(props) {
		super(props)
		this.game = props.navigation.state.params.game
		this.state = {
			gameId: this.game.id,
			usernames: this.game.players,
			localPlayer: props.screenProps.state.localPlayer,
			localUsername: props.screenProps.state.username,
			currentPlayer: this.game.currentPlayer,
			score: this.game.score,
			decks: this.game.decks,
			supply: this.game.supply,
      draw: this.game.draw,
      discard: this.game.discard,
      hand: this.game.hand,
      trash: this.game.trash,
      status: this.game.status,
			turnOrder: this.game.turnOrder,
			playarea: [],
			actions: 1,
			buys: 1,
			coins: 0,
			cardsGained: [],
			cardsTrashed: [],
			hasBought: false,
			competitors: this.game.competitors,
			attackQueue: this.game.attackQueue,
			actionQueue: [],
			cardImage: "",
			turnPhase: 1,
			popupAction: null,
			turns: this.game.turns
		}
	}

  render() {
    return (
      <RootNav screenProps={{
				state: this.state,
				setParentState: this.setState.bind(this),
				goBack: this.props.navigation.goBack.bind(this)
				updateGameState: this.game.updateGameState
			}} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#abcdef',
    alignItems: 'center',
    justifyContent: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
  },
});
