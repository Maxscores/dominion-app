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

export default class Scoreboard extends Component<Props> {
	players() {
		let playerScores = []
		let count = 0
		for (let player in this.props.score) {
			playerScores.push(<Text key={count} style={styles.scoreboardText}>{player}: {this.props.score[player]}</Text>)
			count++
		}
		return playerScores
	}
  render() {
    return (
      <View style={styles.scoreboard}>
				{this.players()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scoreboard: {
    paddingTop: responsiveHeight(5),
    width: responsiveWidth(35),
    height: responsiveHeight(27),
    backgroundColor: 'green',
    alignItems: 'center'
  },
  scoreboardText: {
    fontSize: responsiveFontSize(2),
  }
})
