
const baseURL = "https://dominion-backend.herokuapp.com"

const handleResponse = (response) => {
	return response.json()
		.then((json) => {
			if(!response.ok) {
				const error = {
					status: response.status,
					statusText: response.statusText,
					json
				}
				return Promise.reject(error)
			}
			return json
		})
}

const errorLog = (error) => {
	console.error({ error })
}

const getGameState = (gameId) => {
	return fetch(`${baseURL}/api/v1/games/${gameId}`)
		.then(handleResponse)
		.catch(errorLog)
}

const postConfig = (gameState) => {
	return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
			body: JSON.stringify(gameState)
    }
}

const gameStatePrep = (gameStateRaw) => {
	gameState = {
		supply: gameStateRaw.supply,
		trash: gameStateRaw.trash,
		attack_stack: gameStateRaw.attackStack,
		deck: {
			draw: gameStateRaw.draw,
			discard: [
				...gameStateRaw.discard,
				...gameStateRaw.playarea,
				...gameStateRaw.hand,
				...gameStateRaw.cardsGained
			]
		},
		turn: {
			coins: gameStateRaw.coins,
			cards_played: gameStateRaw.playarea,
			cards_gained: gameStateRaw.cardsGained,
			cards_trashed: gameStateRaw.cardsTrashed
			}
	}
}

const postTurn = (gameId, gameStateRaw) => {
	let gameState = gameStatePrep(gameStateRaw)
	return fetch(`${baseURL}/api/v1/games/${gameId}/turns`, postConfig(gameState))
		.catch(errorLog)
}


module.exports = { getGameState, postTurn }
