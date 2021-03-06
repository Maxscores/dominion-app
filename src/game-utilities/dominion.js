import _ from 'lodash'
import {
	coins,
	actions,
	buys,
	drawCards,
	discardCards,
	actionQueue,
	attackQueue,
	trashCard,
	clearAttackQueue
} from './game-mechanics'


export default dominonCards = {
	'estate': {
		'type': 'victory',
		'cost': 2,
		'vp': 1,
	},
	'duchy': {
		'type': 'victory',
		'cost': 5,
		'vp': 3,
	},
	'province': {
		'type': 'victory',
		'cost': 8,
		'vp': 6,
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
			if (hand.includes('copper')) {
				let cardIndex = hand.indexOf('copper')
				hand.splice(cardIndex, 1)
				let newTrash = trashCard(state.trash, 'copper')
				let newCoins = coins(state.coins, 3)
				let newHand = {hand: hand}
				let resultingState = _.merge(newHand, newTrash)
				resultingState = _.merge(resultingState, newCoins)
				return resultingState
			}
			return {}
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
	},
	'witch': {
		'type': ['action', 'attack'],
		'cost': 5,
		'action': (state) => {
			let newDraw = drawCards(2, state)
			let newAttackQueue = attackQueue(state.currentPlayer, state.attackQueue, 'witch')
			let resultingState = _.merge(newDraw, newAttackQueue)
			return resultingState
		},
		'attack': (state) => {
			state.supply['curse']--
			let newSupply = {supply: state.supply}
			let cardsGained = {cardsGained: [...state.cardsGained, 'curse']}
			let newPlayarea = {playarea: ['curse', ...state.playarea]}
			let resultingState = _.merge(cardsGained, newSupply)
			resultingState = _.merge(resultingState, newPlayarea)
			return resultingState
		}
	},
	'moat': {
		'type': ['action', 'reaction'],
		'cost': 2,
		'action': (state) => {
			return drawCards(2, state)
		},
		'reaction': (state) => {
			return clearAttackQueue(state.currentPlayer, state.attackQueue)
		}
	},
	'harbinger': {
		'type': 'action',
		'action': (state) => {
			let discard = state.discard.map((card, index) => {
				return {label: card, value: index}
			})
			let cardsGained = drawCards(1, state)
			let newActions = actions(state.actions, 1)
			let newActionQueue = actionQueue(state.actionQueue, {card: 'harbinger', discardCards: discard })
			let resultingState = _.merge(cardsGained, newActions)
			resultingState = _.merge(resultingState, newActionQueue)
			return resultingState
		},
		'cost': 3
	}
}
