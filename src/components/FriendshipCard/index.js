import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { getGameState, postTurn } from '../../game-utilities/services'
import { playerDeck } from '../../game-utilities/game-mechanics'
import _ from 'lodash'
import { images } from '@assets/images'

export default class GameCard extends Component<Props> {
	constructor() {
		super()
	}

	componentDidMount() {

	}

	render() {
		return (
			<View
				style={styles.card}>
				<Text>{this.props.friend.username}</Text>
				<Text>{this.props.friend.gamesPlayed}Played: 10</Text>
				<Text>{this.props.friend.record}Record: 10-0</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfa891',
    alignItems: 'center',
    justifyContent: 'center',
  },
	innerCard: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		paddingHorizontal: responsiveWidth(5),
		width: responsiveWidth(70),
		borderBottomColor: 'white',
	},
	text: {
		fontSize: 14
	},
	icon: {
		height: responsiveHeight(15),
	},
	currentPlayer: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	card: {
		width: responsiveWidth(80),
		borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',
		margin: responsiveHeight(1),
	}
});
