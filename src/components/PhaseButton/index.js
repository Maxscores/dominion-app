import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {nextPhase, finishTurn} from '../../game-utilities/game-engine'
import {isActionPhase, isBuyPhase} from '../../game-utilities/game-mechanics'

export default class CallbackWindow extends Component {
	constructor() {
		super()
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
		} else if (isBuyPhase(this.props.screenProps.state)) {
			finishTurn(this.props.screenProps.state)
		}
	}

	render() {
		<Button
			title={this.buttonTitle()}
			onPress={ () => this.completePhase() }
		>
		</Button>
	}
}
