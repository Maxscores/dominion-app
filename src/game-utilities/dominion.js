var _ = require('lodash')
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


export default dominonCards = {
	'estate': {
		'type': 'victory',
		'cost': 2
	},
	'duchy': {
		'type': 'victory',
		'cost': 5
	},
	'province': {
		'type': 'victory',
		'cost': 8
	},
	'laboratory': {
		'type': 'action',
		'action': (state) => {
			let draw = drawCards(2, state)
			let newActions = actions(state.actions, 1)
			let resultingState = _.merge(draw, newActions)
			return resultingState
		},
		'cost': 5
	},
	'festival': {
		'type': 'action',
		'action': (state) => {
			let newActions = actions(state.actions, 2)
			let newBuys = buys(state.buys, 1)
			let newCoins = coins(state.coins, 2)
			let resultingState = _.merge(newBuys, newActions)
			resultingState = _.merge(resultingState, newCoins)
			return resultingState
		},
		'cost': 5
	},
	'smithy': {
		'type': 'action',
		'action': (state) => {
			return drawCards(3, state)
		},
		'cost': 4
	},
	'copper': {
		'type': 'treasure',
		'action': (state) => {
			return coins(state.coins, 1)
		},
		'cost': 0
	},
	'silver': {
		'type': 'treasure',
		'action': (state) => {
			return coins(state.coins, 2)
		},
		'cost': 3
	},
	'gold': {
		'type': 'treasure',
		'action': (state) => {
			return coins(state.coins, 3)
		},
		'cost': 6
	},
	'village': {
		'type': 'action',
		'action': (state) => {
			let draw = drawCards(1, state)
			let newActions = actions(state.actions, 2)
			let resultingState = _.merge(draw, newActions)
			return resultingState
		},
		'cost': 3
	},
	'market': {
		'type': 'action',
		'action': (state) => {
			let newDraw = drawCards(1, state)
			let newActions = actions(state.actions, 1)
			let newCoins = coins(state.coins, 1)
			let newBuys = buys(state.buys, 1)
			let resultingState = _.merge(newDraw, newActions)
			resultingState = _.merge(resultingState, newCoins)
			resultingState = _.merge(resultingState, newBuys)
			return resultingState
		},
		'cost': 5
	},
	'vassal': {
		'type': 'action',
		'action': (state) => {
			let newCoins = coins(state.coins, 2)
			let newActionStack = actionStack(state.actionStack, {card: 'vassal', revealedCard: `${state.draw[0]}` })
			let resultingState = _.merge(resultingState, newActionStack)
			return resultingState
		},
		'cost': 3
	},
	'council_room': {
		'type': 'action',
		'action': (state) => {
			let draw = drawCards(4, state)
			let newBuys = buys(state.buys, 1)
			let attacks = attackStack(state.currentPlayer, state.attackStack, 'council_room')
			let resultingState = _.merge(draw, newBuys)
			resultingState = _.merge(resultingState, attacks)
			return resultingState
		},
		'attack': (state) => {
			return drawCards(1, state)
		},
		'cost': 5
	},
	'moneylender': {
		'type': 'action',
		'action': (state) => {
			let hand = state.hand
			let cardIndex = hand.indexOf('copper')
			hand.splice(cardIndex, 1)
			let newTrash = trash(state.trash, 'copper')
			let newCoins = coins(state.coins, 3)
			let resultingState = _.merge(hand, newTrash)
			resultingState = _.merge(resultingState, newCoins)
			return resultingState
		},
		'cost': 4
	}
}
