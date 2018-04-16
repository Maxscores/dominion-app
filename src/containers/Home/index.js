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
	tabBarPosition: 'top',
  tabBarOptions: {
    labelStyle: {
      fontSize: 22,
    },
    style: {
			paddingTop: responsiveHeight(2),
      height: responsiveHeight(11),
    }
  },
	lazy: false
}

const RootNav = TabNavigator(tabRouteConfig, tabNavConfig)

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			localPlayer: props.screenProps.id,
			games: props.screenProps.games,
			friends: props.screenProps.friends
		}
	}



  render() {
    return (
      <RootNav
				style={styles.container}
				screenProps={{state: this.state, setParentState: this.setState.bind(this)}}
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
