import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { nextPhase, finishTurn } from '../../game-utilities/game-engine'
import { isActionPhase, isBuyPhase } from '../../game-utilities/game-mechanics'

export default class PhaseButton extends Component {
	constructor() {
		super()
    this.state = {
      backgroundColor: '#2662bd',
      borderColor: '#2662bd',
    }
	}

	buttonTitle() {
		if (isActionPhase(this.props.screenProps.state)) {
			return "Finish Actions"
		} else if (isBuyPhase(this.props.screenProps.state)) {
			return "Finish Buys"
		} else {
			return "loading"
		}
	}

	completePhase() {
		if (isActionPhase(this.props.screenProps.state)) {
			nextPhase(this.props.screenProps)
      this.setState({backgroundColor: '#d39b17', borderColor: '#b58413'})
		} else if (isBuyPhase(this.props.screenProps.state)) {
			finishTurn(this.props.screenProps)
		}
	}

	render() {
		return (
      <View>
        <TouchableHighlight
          style={[styles.button, this.state]}
          onPress={ () => this.completePhase() }
          underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>{this.buttonTitle()}</Text>
        </TouchableHighlight>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    alignSelf: 'center',
    shadowOpacity: 0,
    elevation: 0,
  },
  button: {
    height: 26,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: responsiveWidth(2),
    marginRight: responsiveWidth(1),
    marginBottom: responsiveHeight(2),
    width: responsiveWidth(33),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
})
