const assert = require('chai').assert
import {
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
	hasCoins
} from '../src/game-utilities/game-mechanics'

describe("Game Mechanics", () => {
	context("Coins", () => {
		it("returns expected", () => {
			expected = {coins: 2}

			assert.deepEqual(expected, coins(0, 2))
		})
	})

	context("Actions", () => {
		it("returns expected", () => {
			expected = {actions: 2}

			assert.deepEqual(expected, actions(0, 2))
		})
	})

	context("buys", () => {
		it("returns expected", () => {
			expected = {buys: 2}

			assert.deepEqual(expected, buys(0, 2))
		})
	})

	context("draw cards", () => {
		it("can draw 2 cards from the deck with a hand", () => {
			state = {hand: ['copper'], draw: ['estate', 'estate'], discard: []}
			expected = {draw: [], hand: ['copper', 'estate', 'estate'], discard: []}

			assert.deepEqual(expected, drawCards(2, state))
		})

		it("can draw 2 cards from the deck without a hand", () => {
			state = {hand: [], draw: ['estate', 'estate'], discard: []}
			expected = {draw: [], hand: ['estate', 'estate'], discard: []}

			assert.deepEqual(expected, drawCards(2, state))
		})

		it("can shuffle the discard pile if deck is empty", () => {
			state = {hand: [], draw: [], discard: ['estate', 'estate']}
			expected = {draw: [], hand: ['estate', 'estate'], discard: []}

			assert.deepEqual(expected, drawCards(2, state))
		})

		it("doesn't error if there aren't enough cards", () => {
			state = {hand: [], draw: [], discard: ['estate', 'estate']}
			expected = {draw: [], hand: ['estate', 'estate'], discard: []}

			assert.deepEqual(expected, drawCards(4, state))
		})
	})

	context("discard cards", () => {
		it("can discard 2 cards from draw to discard", () => {
			draw = ['copper', 'estate']
			discard = []
			expected = {draw: [], discard: ['copper', 'estate']}

			assert.deepEqual(expected, discardCards(2, draw, discard))
		})

		it("doesn't error if discard more cards than present from draw to discard", () => {
			draw = ['copper', 'estate']
			discard = []
			expected = {draw: [], discard: ['copper', 'estate']}

			assert.deepEqual(expected, discardCards(3, draw, discard))
		})
	})

	context("action queue", () => {
		it("can add an item to the action queue", () => {
			expected = {actionQueue: ['action']}

			assert.deepEqual(expected, actionQueue([], 'action'))
		})
	})

	context("attack queue", () => {
		it("can add an item to the attack queue", () => {
			currentPlayer = 1
			currentAttacks = {1: [], 2: [], 3: [], 4: []}
			expected = {attackQueue: {1: [], 2: ['attack'], 3: ['attack'], 4: ['attack']}}

			assert.deepEqual(expected, attackQueue(currentPlayer, currentAttacks, 'attack'))
		})

		it('can retain attacks', () => {
			currentPlayer = 1
			currentAttacks = {1: [], 2: ['attack', 'attack'], 3: [], 4: []}
			expected = {attackQueue: {1: [], 2: ['attack', 'attack', 'attack'], 3: ['attack'], 4: ['attack']}}

			assert.deepEqual(expected, attackQueue(currentPlayer, currentAttacks, 'attack'))
		})
	})

	context("trash", () => {
		it("adds a card to the trash", () => {
			trash = ['copper']
			expected = {trash: ['copper', 'estate']}

			assert.deepEqual(expected, trashCard(trash, 'estate'))
		})
	})

	context("isBuyPhase", () => {
		it("returns expected", () => {
			assert.isOk(isBuyPhase({turnPhase: 3}))

			assert.isNotOk(isBuyPhase({turnPhase: 2}))
			assert.isNotOk(isBuyPhase({turnPhase: 1}))
		})
	})

	context("isActionPhase", () => {
		it("returns expected", () => {
			assert.isOk(isActionPhase({turnPhase: 2}))

			assert.isNotOk(isActionPhase({turnPhase: 1}))
			assert.isNotOk(isActionPhase({turnPhase: 3}))
		})
	})

	context("hasActions", () => {
		it("returns expected", () => {
			assert.isOk(hasActions({actions: 1}))

			assert.isNotOk(hasActions({actions: 0}))
		})
	})

	context("hasCoins", () => {
		it("returns expected", () => {
			assert.isOk(hasCoins({coins: 3}, 'silver'))

			assert.isNotOk(hasCoins({coins: 0}, 'silver'))
		})
	})

	context("hasBuys", () => {
		it("returns expected", () => {
			assert.isOk(hasBuys({buys: 1}))

			assert.isNotOk(hasBuys({buys: 0}))
		})
	})

	context("canBuyCard", () => {
		it("can buy card", () => {
			state = {buys: 1, turnPhase: 3, coins: 3}

			assert.isOk(canBuyCard(state, 'silver'))
		})

		it("cannot buy card with no buys", () => {
			state = {buys: 0, turnPhase: 3, coins: 3}

			assert.isNotOk(canBuyCard(state, 'silver'))
		})

		it("cannot buy card during action phase", () => {
			state = {buys: 1, turnPhase: 2, coins: 3}

			assert.isNotOk(canBuyCard(state, 'silver'))
		})

		it("cannot buy card with no coins", () => {
			state = {buys: 1, turnPhase: 3, coins: 0}

			assert.isNotOk(canBuyCard(state, 'silver'))
		})
	})

	context("canPlayCard", () => {
		it("can play Action card", () => {
			state = {actions: 1, turnPhase: 2}

			assert.isOk(canPlayCard(state, 'village'))
		})

		it("cannot play Action card without actions", () => {
			state = {actions: 0, turnPhase: 2}

			assert.isNotOk(canPlayCard(state, 'village'))
		})

		it("cannot play Action card on other phases", () => {
			state = {actions: 1, turnPhase: 1}
			assert.isNotOk(canPlayCard(state, 'village'))

			state = {actions: 1, turnPhase: 3}
			assert.isNotOk(canPlayCard(state, 'village'))
		})

		it("can play Treasure card", () => {
			state = {turnPhase: 3, hasBought: false}

			assert.isOk(canPlayCard(state, 'copper'))
		})

		it("cannot play Treasure card on other phases", () => {
			state = {turnPhase: 1, hasBought: false}
			assert.isNotOk(canPlayCard(state, 'copper'))

			state = {turnPhase: 2, hasBought: false}
			assert.isNotOk(canPlayCard(state, 'copper'))
		})

		it("cannot play Treasure card after buying", () => {
			state = {turnPhase: 3, hasBought: true}

			assert.isNotOk(canPlayCard(state, 'copper'))
		})
	})

	context("playerDeck", () => {
		it("returns the deck of the current player with the top 5 cards drawn", () => {
			currentPlayer = '1'
			decks = [{
				player_id: '1',
				draw: ['copper', 'estate', 'copper', 'estate', 'copper'],
				discard: []
			},{
				player_id: '2',
				draw: ['silver', 'estate', 'silver', 'estate', 'silver'],
				discard: []
			}]

			expected = {
				draw: [],
				hand: ['copper', 'estate', 'copper', 'estate', 'copper'],
				discard: []
			}

			assert.deepEqual(expected, playerDeck(decks, currentPlayer))
		})
	})
})
