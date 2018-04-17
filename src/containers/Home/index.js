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
import Account from './Account'
import Playground from '../Playground'
import GamesList from './GamesList'
import { getPlayer } from '../../game-utilities/services'


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
			title: 'Active Game',
			tabBarVisible: false
		})
	}
}

const stackNavConfig = {
	headerStyle: {
		height: responsiveHeight(10),
	},
}

const GamesNav = StackNavigator(stackRouteConfig, stackNavConfig)

const tabRouteConfig = {
	Account: {
		screen: Account,
	},
  Games: {
    screen: GamesNav,
  },
  Friends: {
    screen: Friends,
  },
  Play: {
    screen: NewGame,
  },
}

const tabNavConfig = {
	tabBarPosition: 'top',
  tabBarOptions: {
    labelStyle: {
      fontSize: 18,
    },
    style: {
			paddingTop: responsiveHeight(2),
      height: responsiveHeight(11),
    }
  }
}

const RootNav = TabNavigator(tabRouteConfig, tabNavConfig)

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			localPlayer: props.screenProps.state.id,
			games: props.screenProps.state.games,
			friends: props.screenProps.state.friends,
			username: props.screenProps.state.username
		}
		this.setState = this.setState.bind(this)
		this.getPlayerState = this.getPlayerState.bind(this)
	}

	getPlayerState() {
		getPlayer(this.state.localPlayer)
			.then((response) => this.setState(response))
	}

  render() {
    return (
      <RootNav
				style={styles.container}
				screenProps={{
					state: this.state,
					setParentState: this.setState,
					getPlayerState: this.getPlayerState,
					logoutUser: this.props.screenProps.logoutUser
				}}
			/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bfa891',
    alignItems: 'center',
    justifyContent: 'center',
		height: responsiveHeight(100)
  },
});
