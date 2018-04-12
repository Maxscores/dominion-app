import {
	coins,
	actions,
	buys,
	drawCards,
	discardCards,
	actionStack,
	attackStack,
	trash
} from './game-mechanics'
import dominionCards from './dominion'
import { postTurn } from './services'

import _ from 'lodash'

const resolveAttackStack = (screenProps) => {
	let allAttacks = screenProps.state.attackStack
	let currentAttacks = allAttacks[`${screenProps.state.currentPlayer}`]
	if (currentAttacks.length === 0) {
		while (currentAttacks.length > 0) {
			playAttack(screenProps.state, currentAttacks.shift())
		}
		screenProps.setParentState({
			attackStack: allAttacks
		})
	}
	nextPhase(screenProps)
}

const playAttack = (screenProps, card) => {
	screenProps.setParentState(dominionCards[card]['attack'](screenProps.state))
}

const nextPhase = (screenProps) => {
	screenProps.setParentState({turnPhase: screenProps.state.turnPhase + 1})
}

const finishTurn = (state) => {
	postTurn(state.gameId, state)
		.then(alert('Turn completed'))
}

module.exports = {
	resolveAttackStack,
	finishTurn
}
