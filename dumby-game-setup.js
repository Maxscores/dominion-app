export const game = {
	"game_id": 4,
	"competitors": [
			1,
			2
		],
	"game_cards": {
		"Copper": 40,
		"Curse": 10,
		"Silver": 29,
		"Gold": 30,
		"Estate": 10,
		"Duchy": 10,
		"Province": 10,
		"Thief": 10,
		"Young Witch": 10,
		"Vineyard": 10,
		"Mint": 10,
		"Harem": 10,
		"Cellar": 10,
		"Worker's Village": 10,
		"Monument": 10,
		"Caravan": 10,
		"Baron": 10
	},
	"trash": [],
	"status": "active",
	"decks": [
		{
			"id": 1,
			"competitor_id": 1,
			"draw": [
				"copper",
				"copper",
				"estate",
				"copper",
				"copper"
			],
			"discard": [
				"copper",
				"copper",
				"copper",
				"estate",
				"estate",
				"silver"
			],
			"deck_makeup": {
				"copper": 7,
				"estate": 3,
				"silver": 1
			}
		},
		{
			"id": 2,
			"competitor_id": 2,
			"draw": [
				"estate",
				"copper",
				"estate",
				"copper",
				"copper",
				"copper",
				"copper",
				"copper",
				"estate",
				"copper"
			],
			"discard": [],
			"deck_makeup": {
				"estate": 3,
				"copper": 7
			}
		}
	]
}
