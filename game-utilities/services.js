
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

const getGameState = (gameID) => {
	return fetch(`${baseURL}/api/v1/games/${gameID}`)
		.then(handleResponse)
		.catch(errorLog)
}


module.exports = { getGameState }
