
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

const postConfig = (info) => {
	return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
			body: JSON.stringify(info)
    }
}

const gameStatePrep = (gameStateRaw) => {
	return gameState = {
		supply: gameStateRaw.supply,
		trash: gameStateRaw.trash,
		attack_queue: gameStateRaw.attackQueue,
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

const userInfoPrep = (userInfoRaw) => {
	return {
		username: userInfoRaw.username,
		password: userInfoRaw.password,
		phone_number: userInfoRaw.phoneNumber
	}
}

const postTurn = (gameId, gameStateRaw) => {
	let gameState = gameStatePrep(gameStateRaw)
	return fetch(`${baseURL}/api/v1/games/${gameId}/turns`, postConfig(gameState))
		.catch(errorLog)
}

const postPlayer = (userInfo) => {
	let userState = userInfoPrep(userInfo)
	return fetch(`${baseURL}/api/v1/signup`, postConfig(userState))
		.then(handleResponse)
		.catch(errorLog)
}

const getPlayer = (userInfo) => {
	return fetch(`${baseURL}/api/v1/login?username=${userInfo.username}&password=${userInfo.password}`)
		.then(handleResponse)
		.catch(errorLog)
}

const postNewGame = (players) => {
	let gamePlayers = {competitors: players}
	return fetch(`${baseURL}/api/v1/games`, postConfig(gamePlayers))
		.then(handleResponse)
		.catch(errorLog)
}


module.exports = { getGameState, postTurn, postPlayer, getPlayer, postNewGame }
