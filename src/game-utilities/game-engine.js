import {
	canBuyCard,
	canPlayCard,
	isBuyPhase
} from './game-mechanics'
import dominionCards from './dominion'
import { postTurn } from './services'

import _ from 'lodash'

const resolveAttackQueue = (screenProps) => {
	let allAttacks = screenProps.state.attackQueue
	let currentAttacks = allAttacks[screenProps.state.currentPlayer]
	console.warn(currentAttacks)
	while (currentAttacks.length > 0) {
		playAttack(screenProps, currentAttacks.shift())
	}
	screenProps.setParentState({
		attackQueue: allAttacks
	})
	nextPhase(screenProps)
}

const playAttack = (screenProps, card) => {
	screenProps.setParentState(dominionCards[card]['attack'](screenProps.state))
}

const nextPhase = (screenProps) => {
	screenProps.setParentState({turnPhase: screenProps.state.turnPhase + 1})
}

const finishTurn = (props) => {
	postTurn(props.state.gameId, props.state)
		.then((response) => props.updateGameState(response))
		.then(alert('Turn completed'))
		.then(props.goBack())
}

const resolveActionQueue = (screenProps) => {
	screenProps.setParentState({actionQueue: screenProps.state.actionQueue.slice(1)})
}


const	playCard = (screenProps, card) => {
	if (canPlayCard(screenProps.state, dominionCards[card])) {
		let hand = screenProps.state.hand
		let index = hand.indexOf(card)
		if (index > -1) { hand.splice(index, 1) }
		let playarea = [card, ...screenProps.state.playarea]
		let playCost = 0
		if (dominionCards[card]['type'].includes('action')) {playCost = 1}
		let updatedProps = screenProps
		updatedProps.state.hand = hand
		updatedProps.state.playarea = playarea
		updatedProps.state.actions = screenProps.state.actions - playCost
		screenProps.setParentState(updatedProps,
      () => {screenProps.setParentState(dominionCards[card]['action'](updatedProps.state))}
    )
	} else {
		alert('You cannot play that right now')
	}
}

const buyCard = (screenProps, card) => {
	if (canBuyCard(screenProps.state, dominionCards[card])) {
		let supply = screenProps.state.supply
		supply[card]--
		let cardsGained = [...screenProps.state.cardsGained, card]
		let playarea = [card, ...screenProps.state.playarea]
		let score = screenProps.state.score
		if (dominionCards[card].type.includes('victory')) {
			score[screenProps.state.localUsername] += dominionCards[card].vp
		}
		screenProps.setParentState({
			coins: screenProps.state.coins - dominionCards[card]['cost'],
			cardsGained: cardsGained,
			playarea: playarea,
			supply: supply,
			buys: screenProps.state.buys - 1,
			hasBought: true,
			score: score
		})
	} else if (!isBuyPhase(screenProps.state)) {
		alert('It is not the buy phase')
	} else {
		alert('You do not have enough coins or buys')
	}
}


module.exports = {
	resolveAttackQueue,
	resolveActionQueue,
	finishTurn,
	playCard,
	nextPhase,
	buyCard
}
