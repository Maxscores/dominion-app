import _ from 'lodash'
import {
	coins,
	actions,
	buys,
	drawCards,
	discardCards,
	actionQueue,
	attackQueue,
	trashCard
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
	'curse': {
		'type': 'curse',
		'cost': 0
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
			let newActionQueue = actionQueue(state.actionQueue, {card: 'vassal', revealedCard: `${state.draw[0]}` })
			let resultingState = _.merge(newCoins, newActionQueue)
			return resultingState
		},
		'cost': 3
	},
	'council_room': {
		'type': 'action',
		'action': (state) => {
			let draw = drawCards(4, state)
			let newBuys = buys(state.buys, 1)
			let attacks = attackQueue(state.currentPlayer, state.attackQueue, 'council_room')
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
			let newTrash = trashCard(state.trash, 'copper')
			let newCoins = coins(state.coins, 3)
			let newHand = {hand: hand}
			let resultingState = _.merge(newHand, newTrash)
			resultingState = _.merge(resultingState, newCoins)
			return resultingState
		},
		'cost': 4
	},
	'chapel': {
		'type': 'action',
		'action': (state) => {
			let hand = state.hand.map((card, index) => {
				return {label: card, value: index}
			})
			return actionQueue(state.actionQueue, {card: 'chapel', handCards: hand })
		},
		'cost': 2
	}
}
