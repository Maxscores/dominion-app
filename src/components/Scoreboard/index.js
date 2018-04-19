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
        <Text style={styles.title}>Victory Points</Text>
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
    backgroundColor: 'rgba(42, 168, 28, 0.5)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  scoreboardText: {
    fontSize: responsiveFontSize(2),
    shadowOpacity: 0,
    elevation: 0,
  },
  title: {
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2.5),
    shadowOpacity: 0,
    elevation: 0,
  }
})
