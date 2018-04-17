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
		return this.props.players.map((player, index) => {
			return (
				<Text key={index} style={styles.scoreboardText}>{player}</Text>
			)
		})
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
    fontSize: responsiveFontSize(2.7),
  }
})
