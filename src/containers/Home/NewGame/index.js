import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
	View,
	Button
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import t from 'tcomb-form-native'
import _ from 'lodash'

const Form = t.form.Form

const Player = t.struct({
  usernameOne: t.enums({
		2: 'tyler',
		3: 'dorothy',
		4: 'gabe',
		5: 'sam'
	}),
	usernameTwo: t.enums({
		2: 'tyler',
		3: 'dorothy',
		4: 'gabe',
		5: 'sam'
	}),
	usernameThree: t.enums({
		2: 'tyler',
		3: 'dorothy',
		4: 'gabe',
		5: 'sam'
	}),
})

const options = {}

export default class NewGame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			opponentOne: '',
			opponentTwo: '',
			opponentThree: '',
			availableFriends: this.props.screenProps.friends
		}
	}
	onChange(value) {
		this.updateAvailableFriends(value)
	}

	updateAvailableFriends(value) {
		let availableFriends = this.state.availableFriends
		if (value.opponentOne !== '') {
			const findOpponentOne = (element) => {
				return +element.id === +value.opponentOne
			}
			let indexOppOne = availableFriends.findIndex(findOpponentOne)
			availableFriends.splice(indexOppOne, 1)
		}
		if (value.opponentTwo !== '') {
			const findOpponentTwo = (element) => {
				return +element.id === +value.opponentTwo
			}
			let indexOppTwo = availableFriends.findIndex(findOpponentTwo)
			availableFriends.splice(indexOppTwo, 1)
		}
		if (value.opponentThree !== '') {
			const findOpponentThree = (element) => {
				return +element.id === +value.opponentThree
			}
			let indexOppThree = availableFriends.findIndex(findOpponentThree)
			availableFriends.splice(indexOppThree, 1)
		}
		let resultingState = _.merge(value, {availableFriends: availableFriends} )
		// console.warn(resultingState)
		this.setState(resultingState)
	}

	players() {
		let friends = this.state.availableFriends.reduce((result, friend) => {
			result[friend.id] = friend.username
			return result
		}, {})

		return t.struct({
		  opponentOne: t.enums(friends),
			opponentTwo: t.enums(friends),
			opponentThree: t.enums(friends),
		})
	}

	selectedPlayers() {
		let value = {
			opponentOne: this.state.opponentOne,
			opponentTwo: this.state.opponentTwo,
			opponentThree: this.state.opponentThree
		}
		return value
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text>NewGame</Text>
				<Text>Select Up to 3 Friends</Text>
				<Form
					ref={c => this._form = c}
					type={this.players()}
					value={this.selectedPlayers()}
					onChange={this.onChange.bind(this)}
					options={options}
				/>
				<Button
					title='Start New Game'
					onPress={() => alert(this.props.screenProps.currentPlayer)}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bfa891',
    height: responsiveHeight(60),
  }
});
