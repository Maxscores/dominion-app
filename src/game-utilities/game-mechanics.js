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

const drawCards = (quantity, state) => {
	let hand = state.hand || []
	let draw = state.draw
	let discard = state.discard
	for (var i = 0; i < quantity; i++) {
		if (draw.length > 0) {
			hand.push(draw.shift())
		} else if (discard.length > 0) {
			draw = _.shuffle(discard)
			discard = []
			hand.push(draw.shift())
		}
	}
	return {draw: draw, hand: hand, discard: discard}
}

const discardCards = (quantity, from, to) => {
	let cards = from.splice(0, quantity)
	let newDiscard = [...to, ...cards]
	return {draw: from, discard: newDiscard}
}

const actionStack = (current, options) => {
	let newStack = [...current, options]
	return {actionStack: newStack}
}

const attackStack = (currentPlayer, currentAttacks, newAttack) => {
	for (let player in currentAttacks) {
		if (+player !== +currentPlayer) {
			currentAttacks[player].push(newAttack)
		}
	}
	return {attackStack: currentAttacks}
}

const trash = (trash, cardName) => {
	return [...trash, cardName]
}

module.exports = {coins, actions, buys, drawCards, discardCards, actionStack, attackStack, trash}
