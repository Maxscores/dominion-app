
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

const postTurn = (gameId, gameState) => {
	return fetch(`${baseURL}/api/v1/games/${gameId}/turns`, postConfig(gameState))
		.catch(errorLog)
}


module.exports = { getGameState, postTurn }
