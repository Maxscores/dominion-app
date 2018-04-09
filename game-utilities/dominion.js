var _ = require('lodash')

const coins = (current, add) => {
	return {coins: current + add}
}

const actions = (current, add) => {
	return {actions: current + add}
}

const buys = (current, add) => {
	return {buys: current + add}
}

const drawCards = (quantity, from, to) => {
	let cards = from.splice(0, quantity)
	let newHand = [...to, ...cards]
	return {draw: from, hand: newHand}
}

export default dominonCards = {
	"copper": (state) => {
		return coins(state.coins, 1)
	},
	"silver": (state) => {
		return coins(state.coins, 2)
	},
	"gold": (state) => {
		return coins(state.coins, 3)
	},
	"village": (state) => {
		let draw = drawCards(1, state.draw, state.hand)
		let newActions = actions(state.actions, 2)
		let resultingState = _.merge(draw, newActions)
		return resultingState
	},
	"market": (state) => {
		let newDraw = drawCards(1, state.draw, state.hand)
		let newActions = actions(state.actions, 1)
		let newCoins = coins(state.coins, 1)
		let newBuys = buys(state.buys, 1)
		let resultingState = _.merge(newDraw, newActions)
		resultingState = _.merge(resultingState, newCoins)
		resultingState = _.merge(resultingState, newBuys)
		return resultingState
	}
}
