import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { getFriend } from '../../game-utilities/services'
import { playerDeck } from '../../game-utilities/game-mechanics'
import _ from 'lodash'
import { images } from '@assets/images'

export default class FriendshipCard extends Component<Props> {
	constructor(props) {
		super()
		this.state = {
			id: props.friend.id,
			username: props.friend.username,
			gamesPlayed: null,
		}
	}

	componentDidMount() {
		getFriend(this.state.id)
			.then((response) => {
				this.setState({
					username: response.username,
					gamesPlayed: response.games_played
				})
			})
	}

	render() {
		return (
			<View
				style={styles.card}>
				<Text style={styles.currentPlayer}>{this.state.username}</Text>
				<Text style={styles.text}>Games Played: {this.state.gamesPlayed}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
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
		alignItems: 'center'
	}
});
