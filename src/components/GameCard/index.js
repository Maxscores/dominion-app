import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableHighlight,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class GameCard extends Component<Props> {
	gamePlayers() {
		let players = ''
		for (var i = 0; i < this.props.game.players.length; i++) {
			players += `${this.props.game.players[i]}, `
		}
		return players.slice(0, players.length - 2)
	}

	render() {
		return (
			<TouchableHighlight
				onPress={ () => this.props.navigateToGame(this.props.game)}
				style={styles.card}>
				<Text>
					Game {this.props.game.id}: {this.gamePlayers()}
					Current Turn: {this.props.game.current}
				</Text>

			</TouchableHighlight>
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
	text: {
		fontSize: 24
	},
	card: {
		height: responsiveHeight(7),
		width: responsiveWidth(80),
		borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',
		margin: responsiveHeight(1),
	}
});
