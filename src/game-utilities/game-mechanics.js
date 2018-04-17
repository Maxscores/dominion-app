import _ from 'lodash'

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

const actionQueue = (current, options) => {
	let newQueue = [...current, options]
	return {actionQueue: newQueue}
}

const attackQueue = (currentPlayer, currentAttacks, newAttack) => {
	for (let player in currentAttacks) {
		if (+player !== +currentPlayer) {
			currentAttacks[player].push(newAttack)
		}
	}
	return {attackQueue: currentAttacks}
}
const clearAttackQueue = (currentPlayer, currentAttacks, newAttack) => {
	for (let player in currentAttacks) {
		if (+player === +currentPlayer) {
			currentAttacks[player] = []
		}
	}
	return {attackQueue: currentAttacks}
}

const trashCard = (trash, cardName) => {
	return {trash: [...trash, cardName]}
}

const isBuyPhase = (state) => {
	return state.turnPhase === 3
}

const isActionPhase = (state) => {
	return state.turnPhase === 2
}

const hasActions = (state) => {
	return state.actions > 0
}

const hasBuys = (state) => {
	return state.buys > 0
}

const hasCoins = (state, card) => {
	return card['cost'] <= state.coins
}

const canBuyCard = (state, card) => {
	if (hasCoins(state, card) && isBuyPhase(state) && hasBuys(state)) {
		return true
	} else {
		return false
	}
}

const canPlayCard = (state, card) => {
	if (card['type'].includes('action') && hasActions(state) && isActionPhase(state)) {
		return true
	} else if (card['type'].includes('treasure') && isBuyPhase(state) && !state.hasBought) {
		return true
	} else {
		return false
	}
}

const playerDeck = (decks, player) => {
	let deck = decks.find((deck) => {
		return +deck.player_id === +player
	})
	return drawCards(5, deck)
}

module.exports = {
	coins,
	actions,
	buys,
	drawCards,
	discardCards,
	actionQueue,
	attackQueue,
	trashCard,
	isBuyPhase,
	isActionPhase,
	canBuyCard,
	canPlayCard,
	playerDeck,
	hasActions,
	hasBuys,
	hasCoins,
	clearAttackQueue
}
