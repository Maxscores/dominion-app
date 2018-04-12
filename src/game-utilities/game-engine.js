import {
	coins,
	actions,
	buys,
	drawCards,
	canPlayCard,
	discardCards,
	actionQueue,
	attackQueue,
	trash
} from './game-mechanics'
import dominionCards from './dominion'
import { postTurn } from './services'

import _ from 'lodash'

const resolveAttackQueue = (screenProps) => {
	let allAttacks = screenProps.state.attackQueue
	let currentAttacks = allAttacks[`${screenProps.state.currentPlayer}`]
	if (currentAttacks.length === 0) {
		while (currentAttacks.length > 0) {
			playAttack(screenProps.state, currentAttacks.shift())
		}
		screenProps.setParentState({
			attackQueue: allAttacks
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

const resolveActionQueue = (screenProps) => {
	screenProps.setParentState({actionQueue: screenProps.state.actionQueue.slice(1)})
}


const	playCard = (screenProps, card) => {
		if (canPlayCard(screenProps.state, card)) {
			let hand = screenProps.state.hand
			let index = hand.indexOf(card)
			if (index > -1) { hand.splice(index, 1) }
			let playarea = [card, ...screenProps.state.playarea]
			let playCost = 0
			if (dominionCards[card]['type'].includes('action')) {playCost = 1}
			screenProps.setParentState({
					hand: hand,
					playarea: playarea,
	        actions: screenProps.state.actions - playCost
				},
	      () => {screenProps.setParentState(dominionCards[card]['action'](screenProps.state))}
	    )
		} else {
			alert('You cannot play that right now')
		}
	}

module.exports = {
	resolveAttackQueue,
	resolveActionQueue,
	finishTurn,
	playCard
}
